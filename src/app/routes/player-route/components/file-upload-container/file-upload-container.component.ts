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
  private uploadIndex = 0;
  private isAscending: boolean;
  private subscriptions: Subscription = new Subscription();

  public uploadList: Array<UploadItem> = [];
  public isUploadListOpen = false;
  public isHovering: boolean;
  public sortingField: string;

  constructor(
    private player: PlayerService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.player.getSortingInfo().subscribe(
      data => {
        this.sortingField = data.sortingField;
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
    console.log('preupload process');
    this.isUploadListOpen = true;
    Array.from(event).forEach( file => {
      if (file.type.split('/')[0] !== 'audio') {
        console.error('unsupported file type :( ');
        console.error(file);
      } else {
        console.log('file accepted');
        this.uploadList = [
          {
            fileName: file.name,
            file,
          },
          ...this.uploadList
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
      field === this.sortingField
        ? !this.isAscending
        : true
    );
  }
}
