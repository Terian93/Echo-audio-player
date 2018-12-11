import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerRouteComponent } from './player-route/player-route.component';
import { LoginRouteComponent } from './login-route/login-route.component';
import { RegistrationRouteComponent } from './registration-route/registration-route.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginRouteComponent },
  { path: 'signup', component: RegistrationRouteComponent },
  { path: 'home', component: PlayerRouteComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
