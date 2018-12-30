import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { PlayerService } from '../../services/player.service';

import { Subscription } from 'rxjs';
import { log } from 'util';

@Component({
  selector: 'player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss']
})
export class PlayerUiComponent implements OnInit, OnDestroy {
  private volume = 0.2;
  private currentTime = 0;
  private currentTrackData: any;
  private duration: number;
  private field: string;
  private isAscending: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private storage: AngularFireStorage,
    private player: PlayerService
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.player.getCurrentTime().subscribe(
      value => this.currentTime = value
    ));
    this.subscriptions.add(this.player.getSortingInfo().subscribe(
      data => {
        this.field = data.field;
        this.isAscending = data.isAscending;
      }
    ));
    this.subscriptions.add(this.player.getTrackData().subscribe(
      data => {
        if ( data != null) {
          this.duration = data.duration;
          this.currentTrackData = data;
        }
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sortBy(field: string) {
    this.player.sortList(
      field,
      field === this.field
        ? !this.isAscending
        : this.isAscending
    );
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
  }

  shuffle() {
    this.player.sortList('shuffle');
  }
}
