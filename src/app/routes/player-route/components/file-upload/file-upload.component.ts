import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';


@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  // State for dropzone CSS toggling
  isHovering: boolean;
  downloadURL:Observable<any>;
  upload: Array<object> = [];

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  preUploadProcess(event: FileList) {
    this.upload = [];
    console.log(typeof(event.item(0)));
    let index = 0;
    Array.from(event).forEach( file => new Promise ((resolve, reject) => {
      console.log(file);
      this.startUpload(file, index);
      index++;
      resolve();
    }))
  }

  startUpload(file: File, index: number) {
    console.log(index);
    // The File object
    //const file = event.item(0)
    this.upload.push(file);
    // Client-side validation example
    if (file.type.split('/')[0] !== 'audio') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Echo - audio player project' };

    // The main task
    const task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    const percentage = task.percentageChanges();
    const snapshot   = task.snapshotChanges().pipe(
      tap(snap => {
        //console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('music').add( { path, size: snap.totalBytes })
          //this.upload.pop();
          console.log('file uploaded');
        }
      })
    )
    this.upload.push({task, percentage, snapshot});
    // The file's download URL
    snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


}
