import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { PlayerService } from '../../services/player.service';

import { map, tap } from 'rxjs/operators';
import { Observable, of, observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss']
})
export class PlayerUiComponent implements OnInit {
  private volume = 0;
  private currentTime = 0;
  private duration: number;
  //private downloadURL = this.storage.ref('audio/1545665452494AYWeI9qdWbXy4VbKUY9TJ9OXQKQ2_Pearce_Pickering_Barrelhouse_Jazz_Band_Sweet_Ginger_Green - Copy.mp3').getDownloadURL();
  constructor(
    private storage: AngularFireStorage,
    private player: PlayerService
  ) {
    player.getVolume().pipe(
      tap(value => {
        this.volume = value       
      })
    ).subscribe()
    
    player.getCurrentTime().pipe(
      tap(value =>
        this.currentTime = value
      )
    ).subscribe();

    this.player.getTrackData().duration.pipe(
      tap(value => 
        this.duration = value
      )
    ).subscribe()
  }

  ngOnInit() {
    console.log(this.player.getTrackData());
  }

  playBtn() {
    this.player.playPause()
  }

  nextTrack() {
    this.player.nextTrack();
  }

  previousTrack() {
    this.player.previousTrack();
  }

  changeVolume($event) {
    $event.preventDefault();
    this.player.changeVolume($event.target.value);
  }

  changePosition($event) {
    this.player.changeCurrentTime($event.target.value)
  }

  pause($event) {
    if(!this.player.getPlayerState()){
      this.player.pause() 
    }
  }

  play($event) {
    if(!this.player.getPlayerState()){
      this.player.play() 
    }
  }

  mute() {
    this.player.mute();
  }
}
