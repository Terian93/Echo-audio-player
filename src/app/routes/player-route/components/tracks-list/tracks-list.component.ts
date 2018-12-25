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
  constructor(
    private player: PlayerService
  ) {
    this.trackListBS = this.player.getTrackList()
    this.trackListBS.pipe(
      map(data => {
        this.trackList = data
      })
    ).subscribe()
  }

  ngOnInit() {
  }
}
