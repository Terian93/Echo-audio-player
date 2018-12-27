import { Component } from '@angular/core';
import { uploadItem } from '../../services/upload.service'


@Component({
  selector: 'file-upload-list',
  templateUrl: './file-upload-list.component.html',
  styleUrls: ['./file-upload-list.component.scss']
})
export class FileUploadComponent {
  isHovering: boolean;
  //downloadURL:Observable<any>;
  upload: Array<uploadItem> = [];
  isUploadListHidden: boolean = true;
  uploadIndex: number = 0;

  constructor() { }

  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  preUploadProcess(event: FileList) {    
    this.isUploadListHidden = false;
    Array.from(event).forEach( file => {
      if (file.type.split('/')[0] !== 'audio') { 
        console.error('unsupported file type :( ')
        return;
      } else {
        this.upload[this.uploadIndex] = { 
          fileName: file.name,
          file,
        }
        this.uploadIndex++;
      }
    })    
  }

  toogleUploadList($event: Event) {
    $event.preventDefault();
    this.isUploadListHidden = !this.isUploadListHidden;
  }
}
