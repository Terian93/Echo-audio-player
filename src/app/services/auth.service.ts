import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap, startWith, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorized: boolean;
  private authState
  public user: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.user = this.afAuth.authState;
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
    this.isAuthorized = auth().currentUser !== null ? true : false;
    return this.isAuthorized;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
}
