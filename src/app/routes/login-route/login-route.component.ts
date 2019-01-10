import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.scss']
})

export class LoginRouteComponent implements OnInit {

  public errorMessage: string;
  public form: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  standartLogin() {
    this.authService.standartLogin(this.form.email, this.form.password).then(
      () => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/home']);
        }
        this.errorMessage = null;
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }

  googleLogin() {
    this.authService.googleLogin().then(
      () => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/home']);
        }
        this.errorMessage = null;
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }
}
