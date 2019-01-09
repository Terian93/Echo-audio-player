import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { PlayerService, TrackData } from '../../services/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss']
})
export class PlayerUiComponent implements OnInit, OnDestroy {
  private volume = 0.2;
  private subscriptions: Subscription = new Subscription();

  public isPaused = true;
  public isMuted = false;
  public currentTrackData: TrackData;
  public currentTime = 0;
  public duration: number;

  constructor(
    private storage: AngularFireStorage,
    private player: PlayerService
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.player.getCurrentTime().subscribe(
      value => this.currentTime = value
    ));
    this.subscriptions.add(this.player.getTrackData().subscribe(
      (data: TrackData) => {
        if ( data != null) {
          this.duration = data.duration;
          this.currentTrackData = data;
        }
      }
    ));
    this.subscriptions.add(this.player.getIsPausedBS().subscribe(
      data => this.isPaused = data
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  playBtn() {
    this.player.playPause();
  }

  nextTrack() {
    this.player.nextTrack();
  }

  previousTrack() {
    this.player.previousTrack();
  }

  changeVolume($event) {
    this.volume = $event.target.value;
    this.player.changeVolume($event.target.value);
  }

  changePosition($event) {
    this.player.changeCurrentTime($event.target.value);
  }

  pause() {
    if (!this.player.getPlayerState()) {
      this.player.pause();
    }
  }

  play() {
    if (!this.player.getPlayerState()) {
      this.player.play();
    }
  }

  mute() {
    this.player.mute();
    this.isMuted = !this.isMuted;
  }

  shuffle() {
    this.player.sortList('shuffle');
  }
}
