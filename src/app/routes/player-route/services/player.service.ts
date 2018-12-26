import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { map, tap, filter } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface trackData {
  track: string,
  artist: string,
  date: Timestamp<Object>,
  size: number,
  path: string,
  url: string
}

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  //private audioPlayer = <HTMLAudioElement>document.getElementById("player");
  private audioPlayer = new Audio();
  private volume = new BehaviorSubject(this.audioPlayer.volume);
  private currentTime = new BehaviorSubject(this.audioPlayer.currentTime);
  private duration = new BehaviorSubject(this.audioPlayer.duration)
  private isPaused: boolean = true;
  private uid: string;
  private colection: AngularFirestoreCollection;
  public trackList: Array<DocumentData> = [];
  private trackListBS = new BehaviorSubject(this.trackList);
  private currentTrackIndex: number = 0;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.audioPlayer.volume = 0.2;
    this.volume.next(0.2);
    this.uid = auth().currentUser.uid;
    this.colection = db.collection(this.uid, ref => ref.orderBy('date'))
    this.colection.valueChanges().pipe(
      map (data => {
        this.trackList = data;
        this.trackListBS.next(data);
        this.audioPlayer.src = this.trackList[this.currentTrackIndex].url
        console.log(this.audioPlayer.src);        
      })
    ).subscribe();

    this.audioPlayer.addEventListener('loadedmetadata',() => {
      this.duration.next(this.audioPlayer.duration);
      console.log(this.audioPlayer.duration);
    });

    this.audioPlayer.addEventListener("timeupdate", ()=>{
      this.currentTime.next(this.audioPlayer.currentTime);
      //console.log(this.audioPlayer.currentTime);
      
    });

    this.audioPlayer.addEventListener('ended', () => {
      console.log('ended');
      this.nextTrack();
    })
  }

  playPause() {
    this.isPaused = !this.isPaused;
    this.audioPlayer.autoplay = !this.isPaused;
    this.isPaused
      ? this.pause()
      : this.play()
    console.log(this.isPaused); 
  }

  play() {
    this.audioPlayer.play()
  }

  pause() {
    this.audioPlayer.pause()
  }

  mute() {
    this.audioPlayer.muted = !this.audioPlayer.muted;
  }

  getPlayerState() {
    return this.isPaused;
  }

  getTrackList() {
    return this.trackListBS
  }

  nextTrack() {
    this.currentTrackIndex++;
    this.currentTrackIndex = this.currentTrackIndex === this.trackList.length
      ? 0
      : this.currentTrackIndex;
    this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
    console.log(this.audioPlayer.src);
  }

  previousTrack() {
    this.currentTrackIndex--;
    this.currentTrackIndex = this.currentTrackIndex < 0
      ? (this.trackList.length - 1)
      : this.currentTrackIndex;
    this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
    console.log(this.audioPlayer.src);
  }

  getVolume() {
    return this.volume;
  }
  
  getCurrentTime() {
    return this.currentTime;
  }

  changeVolume(value: number) {
    if ( value >= 0 &&  value <= 1 ) {
      this.audioPlayer.volume = value;
      this.volume.next(value);
    }
  }

  changeCurrentTime(value: number) {
    if ( value >= 0 &&  value <= this.audioPlayer.duration ) {
      this.audioPlayer.currentTime = value;
      this.currentTime.next(value);
    }
  }

  

  getTrackData() {
    return {
      ...this.trackList[this.currentTrackIndex],
      duration: this.duration,
    }
  }
}
