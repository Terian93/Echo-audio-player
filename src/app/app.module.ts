import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { PlayerRouteComponent } from './player-route/player-route.component';
import { LoginRouteComponent } from './login-route/login-route.component';
import { RegistrationRouteComponent } from './registration-route/registration-route.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerRouteComponent,
    LoginRouteComponent,
    RegistrationRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
