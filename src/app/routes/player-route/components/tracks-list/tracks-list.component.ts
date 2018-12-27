import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {
  private trackListBS: BehaviorSubject<Array<any>>;
  private trackList: Array<any>;
  private activeTrack: number;
  private field: string;
  private isAscending: boolean;
  constructor(
    private player: PlayerService
  ) {
    this.trackListBS = this.player.getTrackList()
    this.trackListBS.pipe(
      map(data => {
        this.trackList = data
      })
    ).subscribe()

    this.player.getCurrentTrackId().pipe(
      tap(
        data => this.activeTrack = data
      )
    ).subscribe()

    this.player.getSortingInfo().pipe(
      tap(data => {
        this.field = data.field;
        this.isAscending = data.isAscending;
      })
    ).subscribe()
  }

  ngOnInit() {
  }

  sortBy(field: string) {
    this.player.sortList(
      field,
      field === this.field 
        ? !this.isAscending 
        : this.isAscending
    )
  }

  removeTrack($event: Event, id: string, path: string) {
    $event.stopPropagation();
    this.player.removeTrack(id, path);
  }

  changeTrack($event:Event, index) {
    this.player.playTrack(index);
  }
}
