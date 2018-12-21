import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'player-ui',
  templateUrl: './player-ui.component.html',
  styleUrls: ['./player-ui.component.scss']
})
export class PlayerUiComponent implements OnInit {
  private downloadURL = this.storage.ref('audio/1545318496225AYWeI9qdWbXy4VbKUY9TJ9OXQKQ2_Pearce_Pickering_Barrelhouse_Jazz_Band_Sweet_Ginger_Green - Copy.mp3').getDownloadURL();
  private audioURL:string = "";
  constructor(private storage: AngularFireStorage, ) { }

  ngOnInit() {
    this.downloadURL.subscribe(
      data => this.audioURL = data
    )
  }

}
