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
  private activeTrack: number;
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
    this.subscriptions.add(this.player.getCurrentTrackId().subscribe(
      data => this.activeTrack = data
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sortBy(field: string) {
    this.player.sortList(field);
  }

  removeTrack($event: Event, id: string, path: string) {
    $event.stopPropagation();
    this.player.removeTrack(id, path);
  }

  changeTrack($event: Event, index) {
    this.player.playTrack(index);
  }
}
