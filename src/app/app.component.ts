import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Echo';
  private isHomeRoute = false;
  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private darkModeService: DarkModeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.subscribe(
        data => {
          if (data instanceof NavigationEnd) {
            this.isHomeRoute = data.url === '/home'
              ? true
              : false;
          }
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeColorMode() {
    this.darkModeService.switchColorMode();
  }

  logout() {
    return this.authService.logout();
  }

  test() {
    console.log(this.authService.isAuthenticated());
  }
}
