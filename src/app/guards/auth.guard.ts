import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { tap, map, take } from 'rxjs/operators';

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

    console.log(this.authService.isAuthenticated())
    console.log('guard');
    if (this.authService.isAuthenticated()) {
      console.log('User access granted');
      return true;
    }
    console.log('User access denied');
    this.router.navigate(['/login']);
    return false;

   return this.afAuth.authState.take(1)
       .map(user => !!user)
       .do(loggedIn => {
         if (!loggedIn) {
           console.log("access denied")
           this.router.navigate(['/login']);
         }
     })
  }
*/
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

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
}
