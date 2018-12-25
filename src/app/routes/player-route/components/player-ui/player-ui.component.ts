import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { PlayerService } from '../../services/player.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss']
})
export class PlayerUiComponent implements OnInit {
  //private downloadURL = this.storage.ref('audio/1545665452494AYWeI9qdWbXy4VbKUY9TJ9OXQKQ2_Pearce_Pickering_Barrelhouse_Jazz_Band_Sweet_Ginger_Green - Copy.mp3').getDownloadURL();
  constructor(
    private storage: AngularFireStorage,
    private player: PlayerService
  ) { 
  }

  ngOnInit() {
  }

  changeSong() {
    this.player.changeTrack();
  }

  playBtn() {
    this.player.play()
  }

}
