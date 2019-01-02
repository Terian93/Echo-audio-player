import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Echo';
  private navList: Array<Object>;
  private isHomeRoute = false;

  constructor(
    private authService: AuthService,
    private navService: NavigationService
  ) {
    this.navService.getNavList().subscribe(data => {
      this.navList = data;
      this.isHomeRoute = this.navService.getCurrentRoute() === '/home'
        ? true
        : false;
    });
  }

  logout() {
    this.authService.logout();
  }

  test() {
    console.log(this.authService.isAuthenticated());
  }
}
