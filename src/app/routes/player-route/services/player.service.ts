import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

interface TrackData {
  track: string;
  artist: string;
  date: Timestamp<Object>;
  size: number;
  path: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  private audioPlayer = new Audio();
  private isPaused = true;
  private uid: string;
  private colection: AngularFirestoreCollection;

  private trackList: Array<DocumentData> = [];
  private currentTrackIndex: number;
  private field = 'date';
  private isAscending = true;

  private isLoading = new BehaviorSubject(true);
  private currentTime = new BehaviorSubject(this.audioPlayer.currentTime);
  private duration = new BehaviorSubject(this.audioPlayer.duration);
  private trackListBS = new BehaviorSubject(this.trackList);
  private currentTrack = new BehaviorSubject(this.currentTrackIndex);
  private sortingInfo = new BehaviorSubject({field: this.field, isAscending: this.isAscending});

  private durationListener = () => this.duration.next(this.audioPlayer.duration);
  private currentTimeListener = () => this.currentTime.next(this.audioPlayer.currentTime);
  private endListener = () => this.nextTrack();

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.audioPlayer.volume = 0.2;
    this.uid = auth().currentUser.uid;
    this.colection = db.collection(this.uid, ref => ref.orderBy('date'));
    this.colection.snapshotChanges().subscribe(snapshot => {
      this.trackList = [];
      snapshot.forEach( item => {
        this.trackList.push(
          {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        );
      });
      this.sortList(this.field, this.isAscending);
      this.isLoading.next(false);
    });
    this.audioPlayer.addEventListener('loadedmetadata', this.durationListener);
    this.audioPlayer.addEventListener('timeupdate', this.currentTimeListener);
    this.audioPlayer.addEventListener('ended', this.endListener);
  }

  sortList(field: string, isDirectionAscending: boolean = true) {
    this.field = field;
    if (field === 'shuffle') {
      let currentIndex = this.trackList.length;
      while (0 !== currentIndex) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        const temporaryValue = this.trackList[currentIndex];
        this.trackList[currentIndex] = this.trackList[randomIndex];
        this.trackList[randomIndex] = temporaryValue;
      }
      this.trackListBS.next(this.trackList);
    } else {
      this.isAscending = isDirectionAscending;
      isDirectionAscending
      ? this.trackList.sort(
        (a, b) => a[field] > b[field] ? 1 : ((b[field] > a[field]) ? -1 : 0)
      )
      : this.trackList.sort(
        (a, b) => a[field] > b[field] ? -1 : ((b[field] > a[field]) ? 1 : 0)
      );
      this.trackListBS.next(this.trackList);
    }
    this.sortingInfo.next({field: this.field, isAscending: this.isAscending});
  }

  getSortingInfo() {
    return this.sortingInfo;
  }

  getLoadCheck() {
    return this.isLoading;
  }

  getPlayerState() {
    return this.isPaused;
  }

  getCurrentTime() {
    return this.currentTime;
  }

  getCurrentTrackId() {
    return this.currentTrack;
  }

  getTrackList() {
    return this.trackListBS;
  }

  getTrackData() {
    return {
      ...this.trackList[this.currentTrackIndex],
      duration: this.duration,
    };
  }

  playPause() {
    if ( this.audioPlayer.src === '' ) {
      this.currentTrackIndex = 0;
      this.currentTrack.next(this.currentTrackIndex);
      this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
    }
    this.isPaused = !this.isPaused;
    this.audioPlayer.autoplay = !this.isPaused;
    this.isPaused
      ? this.pause()
      : this.play();
  }

  play() {
    this.audioPlayer.play();
  }

  pause() {
    this.audioPlayer.pause();
  }

  mute() {
    this.audioPlayer.muted = !this.audioPlayer.muted;
  }

  nextTrack() {
    this.currentTrackIndex++;
    this.currentTrackIndex = this.currentTrackIndex === this.trackList.length
      ? 0
      : this.currentTrackIndex;
    this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
    this.currentTrack.next(this.currentTrackIndex);
  }

  previousTrack() {
    this.currentTrackIndex--;
    this.currentTrackIndex = this.currentTrackIndex < 0
      ? (this.trackList.length - 1)
      : this.currentTrackIndex;
    this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
    this.currentTrack.next(this.trackList[this.currentTrackIndex].id);
  }

  playTrack(index: number) {
    if (index !== this.currentTrackIndex) {
      this.currentTrackIndex = index;
      this.audioPlayer.src = this.trackList[index].url;
      this.currentTrack.next(this.currentTrackIndex);
    }
    if (this.isPaused) {
      this.playPause();
    }
  }

  changeVolume(value: number) {
    if ( value >= 0 &&  value <= 1 ) {
      this.audioPlayer.volume = value;
    }
  }

  changeCurrentTime(value: number) {
    if ( value >= 0 &&  value <= this.audioPlayer.duration ) {
      this.audioPlayer.currentTime = value;
      this.currentTime.next(value);
    }
  }

  removeTrack(id: string, path: string) {
    if (this.currentTrackIndex) {
      if (id === this.trackList[this.currentTrackIndex].id) {
        this.trackList.length > 3
          ? this.nextTrack()
          : this.audioPlayer.src = '';
      }
    }
    this.storage.ref(path).delete();
    this.colection.doc(id).delete();
  }
}
