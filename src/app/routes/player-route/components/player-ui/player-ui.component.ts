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
  private field: string;
  private isAscending: boolean;

  constructor(
    private storage: AngularFireStorage,
    private player: PlayerService
  ) {
    player.getCurrentTime().subscribe(
      value => this.currentTime = value
    );
    player.getTrackData().duration.subscribe(
      value => this.duration = value
    );
    this.player.getSortingInfo().subscribe(
      data => {
        this.field = data.field;
        this.isAscending = data.isAscending;
      }
    );
  }

  sortBy(field: string) {
    this.player.sortList(
      field,
      field === this.field
        ? !this.isAscending
        : this.isAscending
    );
  }

  ngOnInit() {
    console.log(this.player.getTrackData());
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
