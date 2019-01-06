import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit, OnDestroy {
  private trackListBS: BehaviorSubject<Array<any>>;
  private trackList: Array<any>;
  private activeTrack: string;
  private isLoading: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private player: PlayerService
  ) {}

  ngOnInit() {
    this.trackListBS = this.player.getTrackList();
    this.subscriptions.add(this.trackListBS.subscribe(
      data => this.trackList = data
    ));
    const isLoading = this.player.getLoadCheck();
    this.subscriptions.add(isLoading.subscribe(
      data => this.isLoading = data
    ));
    this.subscriptions.add(this.player.getTrackData().subscribe(
      data => this.activeTrack = data != null
        ? data.id
        : ''
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sortBy(field: string) {
    this.player.sortList(field);
  }

}
