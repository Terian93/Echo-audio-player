import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadItem } from '../../services/upload.service';
import { PlayerService } from '../../services/player.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'file-upload-list',
  templateUrl: './file-upload-list.component.html',
  styleUrls: ['./file-upload-list.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {
  private isHovering: boolean;
  private upload: Array<UploadItem> = [];
  private isUploadListHidden = true;
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
    this.isUploadListHidden = false;
    Array.from(event).forEach( file => {
      if (file.type.split('/')[0] !== 'audio') {
        console.error('unsupported file type :( ');
      } else {
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
    this.isUploadListHidden = !this.isUploadListHidden;
  }

  sortBy(field: string) {
    this.player.sortList(
      field,
      field === this.field
        ? !this.isAscending
        : this.isAscending
    );
  }
}
