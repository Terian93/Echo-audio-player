import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.authService.isAuthenticated())
    console.log('guard');
    if (this.authService.isAuthenticated()) {
      console.log('User access granted');
      return true;
    }
    console.log('User access denied');
    this.router.navigate(['/login']);
    return false;
  }
}
