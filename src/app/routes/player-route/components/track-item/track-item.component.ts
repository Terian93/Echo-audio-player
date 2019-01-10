import { Component, OnInit, Input } from '@angular/core';
import { PlayerService, TrackData } from '../../services/player.service';

@Component({
  selector: 'track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.scss']
})
export class TrackItemComponent implements OnInit {
  @Input() public index: number;
  @Input() public trackData: TrackData;
  @Input() public activeTrack: string;

  constructor(
    private player: PlayerService
  ) {
  }

  ngOnInit() {}

  changeTrack() {
    this.player.playTrack(this.index);
  }

  removeTrack($event: Event, id: string, path: string) {
    $event.stopPropagation();
    this.player.removeTrack(id, path);
  }

}
