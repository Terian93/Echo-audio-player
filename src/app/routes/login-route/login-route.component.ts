import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl} from '@angular/forms';
import loginValidation from './validation';

@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.scss']
})

export class LoginRouteComponent implements OnInit {

  private loginForm = new FormGroup({
    email: new FormControl('', loginValidation.emailValidators),
    password: new FormControl('', loginValidation.passwordValidators),
  });

  private validationMessages: object = loginValidation.messages;
  private errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  getInputClass(inputName: string) {
    return (
      this.loginForm.controls[inputName].valid || 
      !(this.loginForm.controls[inputName].dirty || this.loginForm.controls[inputName].touched) 
        ? 'valid' 
        : 'invalid'
    );
  }

  checkIfHasError(inputName: string, validationType: string) {    
    return (
      this.loginForm.get(inputName).hasError(validationType) && 
      (this.loginForm.controls[inputName].dirty || this.loginForm.controls[inputName].touched)
    );
  }

  standartLogin() {
    this.authService.standartLogin(this.loginForm.value.email, this.loginForm.value.password).then(
      res => {
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
      res => {
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
