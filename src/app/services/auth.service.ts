import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: boolean;
  private user: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  getAuthState(): boolean {
    return this.authState;
  }

  setAuthState(value: boolean) {
    this.authState = value;
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
    this.afAuth.auth.signOut().then(
      () => {
        this.router.navigate(['login']);
      }
    );
  }

  isAuthenticated() {
    return auth().currentUser !== null ? true : false;
  }
}
