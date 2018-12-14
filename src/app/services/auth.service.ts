import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorized: boolean

  constructor(
    public afAuth: AngularFireAuth,
  ) {}

  initialize() {
    this.isAuthorized = auth().currentUser !== null ? true : false;
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
    //return auth().currentUser;
    return this.isAuthorized;
  }
}
