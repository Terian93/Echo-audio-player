import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  signUp() {
    const email = 'vvanchak2@gmail.com';
    const password = 'Testtesttest'
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
      email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
  }
  

  standartLogin(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  googleLogin() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return auth().currentUser;
  }
}
