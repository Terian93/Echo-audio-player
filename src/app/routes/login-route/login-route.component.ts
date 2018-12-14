import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validationMessages from './validationMessages';

@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.scss']
})
export class LoginRouteComponent implements OnInit {

  private loginForm = new FormGroup({
    email: new FormControl('', 
    [
      Validators.required,
      Validators.email
    ]),
    pass: new FormControl('', Validators.required),
  });

  private validationMessages:object = validationMessages;
  private errorMessage:string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  standartLogin() {
    this.authService.standartLogin(this.loginForm.value.email, this.loginForm.value.pass).then(
      res => {
        if (this.authService.afAuth.user !== null) {
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
      res => {
        if (this.authService.afAuth.user !== null) {
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
