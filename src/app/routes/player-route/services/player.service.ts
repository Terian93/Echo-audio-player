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
    this.uid = auth().currentUser.uid;
    this.colection = db.collection(this.uid, ref => ref.orderBy('date'))
    this.colection.valueChanges().pipe(
      map (data => {
        this.trackList = data;
        this.trackListBS.next(data);
        console.log(data);
        this.audioPlayer.src = this.trackList[this.currentTrackIndex].url
        console.log(this.audioPlayer.src);
      })
    ).subscribe();
    /*
    this.audioPlayer.play().then(
      pass => console.log(pass),
      reject => console.log(reject)
    );*/
    this.audioPlayer.addEventListener('ended', () => {
      console.log('ended');
      this.currentTrackIndex++;
      this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
      
    })
  }

  play() {
    this.isPaused = !this.isPaused;
    this.audioPlayer.autoplay = !this.isPaused;
    this.isPaused
      ? this.audioPlayer.pause()
      : this.audioPlayer.play()
    console.log(this.isPaused); 
  }

  getTrackList() {
    return this.trackListBS
  }

  changeTrack() {
    this.audioPlayer.currentTime = 180;
    //this.currentTrackIndex++;
    //this.audioPlayer.src = this.trackList[this.currentTrackIndex].url;
    //console.log(this.audioPlayer.src);
    
  }

}
