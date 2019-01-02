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

  constructor(
    private authService: AuthService,
    private navService: NavigationService
  ) {
    this.navService.getNavList().subscribe(data => this.navList = data);
  }

  logout() {
    this.authService.logout();
  }

  test() {
    console.log(this.authService.isAuthenticated());
  }
}
