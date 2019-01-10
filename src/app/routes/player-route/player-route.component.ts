import { Component, OnDestroy } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-player-route',
  templateUrl: './player-route.component.html',
  styleUrls: ['./player-route.component.scss']
})
export class PlayerRouteComponent implements OnDestroy {

  constructor(
    private player: PlayerService
  ) { }

  ngOnDestroy() {
    this.player.unsubscribe();
  }

}
