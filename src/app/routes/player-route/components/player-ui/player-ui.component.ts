import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss']
})
export class PlayerUiComponent implements OnInit {
  private downloadURL = this.storage.ref('audio/1545665452494AYWeI9qdWbXy4VbKUY9TJ9OXQKQ2_Pearce_Pickering_Barrelhouse_Jazz_Band_Sweet_Ginger_Green - Copy.mp3').getDownloadURL();
  private audioSRC:string = "";
  constructor(private storage: AngularFireStorage, ) { }

  ngOnInit() {
    this.downloadURL.toPromise().then(
      data => {
        console.log(data);
        this.audioSRC = data;
      }
    )
  }

  changeSong() {
    this.downloadURL = this.storage.ref('audio/1545665455719AYWeI9qdWbXy4VbKUY9TJ9OXQKQ2_01 - tank! (tv stretch).mp3').getDownloadURL()
    this.downloadURL.toPromise().then(
      data => {
        console.log(data);
        this.audioSRC = data;
      }
    )
  }

}
