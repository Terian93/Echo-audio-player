import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { PlayerService } from '../../services/player.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss']
})
export class PlayerUiComponent implements OnInit, OnDestroy {
  private volume = 0;
  private currentTime = 0;
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
    this.subscriptions.add(this.player.getTrackData().duration.subscribe(
      value => this.duration = value
    ));
    this.subscriptions.add(this.player.getSortingInfo().subscribe(
      data => {
        this.field = data.field;
        this.isAscending = data.isAscending;
      }
    ));
    console.log(this.player.getTrackData());
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
    $event.preventDefault();
    this.player.changeVolume($event.target.value);
  }

  changePosition($event) {
    this.player.changeCurrentTime($event.target.value);
  }

  pause($event) {
    if (!this.player.getPlayerState()) {
      this.player.pause();
    }
  }

  play($event) {
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
