import { Injectable } from '@angular/core';
import { auth, storage } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { map, tap, filter } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

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
  private currentTrackIndex: number;
  private currentTrackId = new BehaviorSubject(this.currentTrackIndex);

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.audioPlayer.volume = 0.2;
    this.volume.next(0.2);
    this.uid = auth().currentUser.uid;
    this.colection = db.collection(this.uid, ref => ref.orderBy('date'));
    /*
    this.colection.valueChanges().pipe(
      map ((data) => {        
        this.trackList = data;
        this.trackListBS.next(this.trackList);
        this.audioPlayer.src = this.trackList[this.currentTrackIndex].url
        console.log(this.audioPlayer.src);        
      })
    ).subscribe();*/
    this.colection.snapshotChanges().pipe(
      map (snapshot => {
        this.trackList = [];
        snapshot.forEach( item => {
          this.trackList.push(
            {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            }
          )
        })
        console.log(this.trackList);
        this.trackListBS.next(this.trackList); 
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
    if(this.audioPlayer.src === "") {
      this.currentTrackIndex = 0;
      this.currentTrackId.next(this.currentTrackIndex);
      this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
    }
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
    this.currentTrackId.next(this.currentTrackIndex);
    console.log(this.trackList[this.currentTrackIndex].track);
  }

  previousTrack() {
    this.currentTrackIndex--;
    this.currentTrackIndex = this.currentTrackIndex < 0
      ? (this.trackList.length - 1)
      : this.currentTrackIndex;
    this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
    this.currentTrackId.next(this.trackList[this.currentTrackIndex].id);
    console.log(this.currentTrackIndex);
  }

  playTrack(index: number) {
    if (index !== this.currentTrackIndex) {
      this.currentTrackIndex = index;
      this.audioPlayer.src = this.trackList[index].url;
      this.currentTrackId.next(this.currentTrackIndex);
      console.log(this.trackList[index].track);
    }
    if (this.isPaused) {
      this.playPause();
    }
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

  removeTrack(id: string, path: string) {
    if (id === this.trackList[this.currentTrackIndex].id){
      this.trackList.length > 3
        ? this.nextTrack()
        : this.audioPlayer.src = '';
    } 
    this.storage.ref(path).delete().toPromise().then(
      resolve => {
        console.log('Track removed from firestore:');
        console.log(resolve);
      },
      reject => {
        console.log('Track was not removed from firestore:');
        console.log(reject);
      }
    )
    this.colection.doc(id).delete().then(
      resolve => {
        console.log('Track removed from collection:');
        console.log(resolve);
      },
      reject => {
        console.log('Track was not removed from colection:');
        console.log(reject);
      }
    )
  }

  getCurrentTrackId() {
    return this.currentTrackId
  }
}
