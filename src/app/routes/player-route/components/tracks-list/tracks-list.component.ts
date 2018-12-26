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
  }

  ngOnInit() {
  }

  removeTrack($event: Event, id: string, path: string) {
    $event.stopPropagation();
    console.log(id, path);
    this.player.removeTrack(id, path);
  }

  changeTrack($event:Event, index) {
    console.log(index);
    this.player.playTrack(index);
  }
}
