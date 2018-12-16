import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  /*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      console.log('guard')
      return this.authService.user.pipe(
        take(1),
        map(user => !!user),
          tap(loggedIn => {
            if (!loggedIn) {
              console.log('access denied')
              this.router.navigate(['/login']);
            }
        })
      )
  }
  */
  canActivate(): boolean {
    return this.authService.getAuthState();
  }
}
