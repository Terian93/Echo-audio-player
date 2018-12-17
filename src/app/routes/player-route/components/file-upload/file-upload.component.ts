import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { utf8Encode } from '@angular/compiler/src/util';

const getUserUID = () => {
  const user = auth().currentUser
  return user.uid;
}

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
  // State for dropzone CSS toggling
  isHovering: boolean;
  downloadURL:Observable<any>;
  upload: Array<upload> = [];
  uid: string = getUserUID();
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  preUploadProcess(event: FileList) {
    this.upload = [];
    let index = 0;
    Array.from(event).forEach( file => new Promise ((resolve, reject) => {
      console.log(file);
      //const cr = btoa(file.name)
      this.upload[index] = { 
        name: file.name
      }
      this.startUpload(file, index);
      index++;
      resolve();
    }))
  }

  startUpload(file: File, index: number) {
    console.log(index);
    // The File object
    //const file = event.item(0)
    // Client-side validation example
    if (file.type.split('/')[0] !== 'audio') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `audio/${new Date().getTime()}${this.uid}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Echo - audio player project' };

    // The main task
    const task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    let isUploaded = false;
    const previousValue = this.upload[index];
    this.upload[index] = {
      ...previousValue,
      task, 
      percentage: task.percentageChanges(),
      snapshot: task.snapshotChanges().pipe(
        tap(snap => {
          //console.log(snap)
          if (snap.bytesTransferred === snap.totalBytes && !isUploaded) {
            isUploaded = true;
            // Update firestore on completion
            this.db.collection(this.uid).add( { path, size: snap.totalBytes })
            console.log('file uploaded');
          }
        })
      )
    };
    // The file's download URL
    this.upload[index].snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


}
