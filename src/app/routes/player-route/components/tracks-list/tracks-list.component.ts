import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {
  private trackListBS: BehaviorSubject<Array<any>>;
  private trackList: Array<any>;
  private activeTrack: number;
  private isLoading: boolean;
  constructor(
    private player: PlayerService
  ) {}

  ngOnInit() {
    this.trackListBS = this.player.getTrackList();
    this.trackListBS.subscribe(data => {
      this.trackList = data;
    });
    const isLoading = this.player.getLoadCheck();
    isLoading.subscribe(
      data => this.isLoading = data
    );
    this.player.getCurrentTrackId().subscribe(
      data => this.activeTrack = data
    );
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
