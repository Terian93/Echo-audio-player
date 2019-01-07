import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.scss']
})
export class TrackItemComponent implements OnInit {

  @Input() private trackData: Object;
  @Input() private index: number;
  @Input() private activeTrack: string;

  constructor(
    private player: PlayerService
  ) { }

  ngOnInit() {
  }

  changeTrack($event: Event, index) {
    this.player.playTrack(index);
  }

  removeTrack($event: Event, id: string, path: string) {
    $event.stopPropagation();
    this.player.removeTrack(id, path);
  }

}
