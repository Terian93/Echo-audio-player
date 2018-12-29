import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: boolean;
  private user: Observable<any>;


  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user = this.afAuth.authState;
    /*
    console.log(afAuth);
    console.log(this.user);
    console.log(firebase.auth());
    (this.user.pipe(
      take(1),
      map(user => !!user),
        tap(loggedIn => {
          console.log('angularfire');
          if (!loggedIn) {
            console.log('access denied')
          } else {
            console.log('access granted')
          }
      })
    )).subscribe(data => {
      console.log(data);
      this.authState = data;
    });
    */
    /*
    console.log('firebase');
    console.log(firebase.app);
    console.log(firebase.auth());
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        console.log('access granted')
      } else {
        console.log('access denied')
      }
    })
    */
  }

  getUser() {
    return this.user;
  }

  getAuthState(): boolean {
    return this.authState;
  }

  setAuthState(value: boolean) {
    this.authState = value;
  }

  initialize() {
    console.log('service.initialize');
    console.log(firebase.auth());
    (this.user.pipe(
      take(1),
      map(user => !!user),
        tap(loggedIn => {
          console.log('Inside Pipe');
          console.log(loggedIn);
          if (!loggedIn) {
            console.log('access denied');
          } else {
            console.log('access granted');
          }
      })
    )).subscribe(data => {
      console.log('Subscribe Worked');
      console.log(data);
      this.authState = data;
    });
    /*
    //firebase promise
    return new Promise ((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          console.log('access granted')
          this.authState = true;
        } else {
          console.log('access denied')
          this.authState = false;
        }
        resolve();
      })
    });
    */
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
  }


  standartLogin(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  googleLogin() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    console.log(auth().currentUser);
    return auth().currentUser !== null ? true : false;
  }
}
