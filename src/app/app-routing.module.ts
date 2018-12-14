import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerRouteComponent } from './routes/player-route/player-route.component';
import { LoginRouteComponent } from './routes/login-route/login-route.component';
import { RegistrationRouteComponent } from './routes/registration-route/registration-route.component';
import { AuthGuard } from './guards/auth.guard';

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
