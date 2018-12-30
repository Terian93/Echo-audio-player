import { Component } from '@angular/core';
import { UploadItem } from '../../services/upload.service';


@Component({
  selector: 'file-upload-list',
  templateUrl: './file-upload-list.component.html',
  styleUrls: ['./file-upload-list.component.scss']
})
export class FileUploadComponent {
  isHovering: boolean;
  upload: Array<UploadItem> = [];
  isUploadListHidden = true;
  uploadIndex = 0;

  constructor() { }

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
}
