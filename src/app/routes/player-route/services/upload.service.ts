import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';
import { tap, finalize } from 'rxjs/operators';


export interface UploadItem {
  fileName: string;
  file: File;
  track?: string;
  artist?: string;
  task?: AngularFireUploadTask;
  percentage?: Observable<number>;
  snapshot?: Observable<firebase.storage.UploadTaskSnapshot>;
  isUploaded?: BehaviorSubject<boolean>;
}

@Injectable()

export class UploadService {
  uid: string;
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    const user = auth().currentUser;
    this.uid = user.uid;
  }

  uploadAudioFile(track: string, artist: string, file: File) {
    const path = `audio/${new Date().getTime()}${this.uid}_${file.name}`;
    const customMetadata = { app: 'Echo - audio player project' };
    const task = this.storage.upload(path, file, { customMetadata });
    const isUploaded = new BehaviorSubject(false);
    return {
      task,
      percentage: task.percentageChanges(),
      isUploaded,
      snapshot: task.snapshotChanges().pipe(
        tap(snap => {
          if (snap.bytesTransferred === snap.totalBytes) {
            console.log('file uploaded');
          }
        }),
        finalize( () => {
          console.log('Saving to Database');
          this.storage.ref(path).getDownloadURL().subscribe(
            url => {
              const urlSt = URL.createObjectURL(file);
              const audio = new Audio(urlSt);
              audio.preload = 'metadata';
              audio.addEventListener('loadedmetadata',
                () => {
                  return this.db.collection(this.uid).add(
                  {
                    track,
                    artist,
                    duration: audio.duration,
                    path,
                    url,
                    size: file.size,
                    date: new Date()
                  }
                );
              });
              isUploaded.next(true);
            },
            error => {
              console.error('Error getDownloadURL() in uploadAudioFile(): ' + error);
            }
          );
        })
      )
    };
  }
}
