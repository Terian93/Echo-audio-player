import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Echo';
  constructor(
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }

  test() {
    (this.authService.user.pipe(
      take(1),
      map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            console.log('access denied');
          } else {
            console.log('access granted');
          }
      })
    )).subscribe(data => console.log(data));

    // console.log(this.authService.afAuth);
    console.log(this.authService.isAuthenticated());
  }
}
