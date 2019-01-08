import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadItem } from '../../services/upload.service';
import { PlayerService } from '../../services/player.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'file-upload-container',
  templateUrl: './file-upload-container.component.html',
  styleUrls: ['./file-upload-container.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {
  private isHovering: boolean;
  private upload: Array<UploadItem> = [];
  private isUploadListOpen = false;
  private uploadIndex = 0;
  private field: string;
  private isAscending: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private player: PlayerService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.player.getSortingInfo().subscribe(
      data => {
        this.field = data.field;
        this.isAscending = data.isAscending;
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  preUploadProcess(event: FileList) {
    console.log('preUploadProcess()');
    this.isUploadListOpen = true;
    Array.from(event).forEach( file => {
      if (file.type.split('/')[0] !== 'audio') {
        console.error('unsupported file type :( ');
        console.error(file);
      } else {
        console.log('accepted');
        console.log(event);
        console.log(file);
        this.upload = [
          {
            fileName: file.name,
            file,
          },
          ...this.upload
        ];
      }
    });
  }

  toogleUploadList() {
    this.isUploadListOpen = !this.isUploadListOpen;
  }

  sortBy(field: string) {
    this.player.sortList(
      field,
      field === this.field
        ? !this.isAscending
        : true
    );
  }
}
