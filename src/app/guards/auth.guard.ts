import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(): boolean {
    const canOpen = this.authService.getAuthState();
    if (!canOpen) {
      this.router.navigate(['login']);
    }
    return this.authService.getAuthState();
  }
}
