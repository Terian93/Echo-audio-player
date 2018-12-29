import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import * as firebase from 'firebase/app';

import { PlayerRouteModule } from './routes/player-route/player-route.module';
import { LoginRouteComponent } from './routes/login-route/login-route.component';
import { RegistrationRouteComponent } from './routes/registration-route/registration-route.component';

export function firebaseLoader(injector) {
  return () => new Promise ((resolve, reject) => {
    console.log('firebase initialization');
    firebase.initializeApp(environment.firebase);
    const service = injector.get(AuthService);
    firebase.auth().onAuthStateChanged(user => {
      const isAuth = user !== null ? true : false;
      service.setAuthState(isAuth);
      if (user) {
        console.log('User authorized');
      } else {
        console.log('User unauthorized');
      }
      resolve();
    });
  });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginRouteComponent,
    RegistrationRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    PlayerRouteModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: firebaseLoader,
      deps: [ Injector ],
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
