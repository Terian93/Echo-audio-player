import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uid: string;
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    const user = auth().currentUser;
    this.uid = user.uid;
  }

  uploadAudioFile(file: File) {
    const path = `audio/${new Date().getTime()}${this.uid}_${file.name}`;
    const customMetadata = { app: 'Echo - audio player project' };
    const task = this.storage.upload(path, file, { customMetadata })
    let isUploaded = false;
    return {
      task, 
      percentage: task.percentageChanges(),
      snapshot: task.snapshotChanges().pipe(
        tap(snap => {
          if (snap.bytesTransferred === snap.totalBytes && !isUploaded) {
            isUploaded = true;
            snap.state = 'finished';
            this.db.collection(this.uid).add( { 
              path, 
              size: snap.totalBytes,
            })
            console.log('file uploaded');
          }
        })
      )
    }
    
  }
}
