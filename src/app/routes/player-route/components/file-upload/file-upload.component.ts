import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { UploadService } from '../../services/upload.service'

interface upload {
  name: string,
  task?: AngularFireUploadTask,
  percentage?: Observable<number>,
  snapshot?: Observable<firebase.storage.UploadTaskSnapshot>
}

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  isHovering: boolean;
  //downloadURL:Observable<any>;
  upload: Array<upload> = [];
  isUploadListHidden: boolean = true;
  uploadIndex: number = 0;

  constructor(
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private uploadService: UploadService
  ) { }

  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  preUploadProcess(event: FileList) {
    this.isUploadListHidden = false;
    Array.from(event).forEach( file => new Promise ((resolve, reject) => {
      console.log(file);
      this.upload[this.uploadIndex] = { 
        name: file.name
      }
      this.startUpload(file, this.uploadIndex);
      this.uploadIndex++;
      resolve();
    }))
  }

  startUpload(file: File, index: number) {
    console.log(index);
    if (file.type.split('/')[0] !== 'audio') { 
      console.error('unsupported file type :( ')
      return;
    }
    
    const previousValue = this.upload[index];
    const uploadData = this.uploadService.uploadAudioFile(file)

    this.upload[index] = {
      ...previousValue,
      ...uploadData
    }; 
    //this.upload[index].snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  toogleUploadList($event: Event) {
    $event.preventDefault();
    this.isUploadListHidden = !this.isUploadListHidden;
  }

}
