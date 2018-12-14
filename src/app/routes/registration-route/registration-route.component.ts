import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import signUpValidation from './validation';

@Component({
  selector: 'app-registration-route',
  templateUrl: './registration-route.component.html',
  styleUrls: ['./registration-route.component.scss']
})
export class RegistrationRouteComponent implements OnInit {

  private validationMessages:object = signUpValidation.messages;
  private errorMessage: string;
  private signUpForm = new FormGroup({
    email: new FormControl('', signUpValidation.emailValidators),
    pass: new FormControl('', signUpValidation.passValidators),
    confirmPass: new FormControl(''),
  }, {validators: [
    signUpValidation.checkPassRepeat,
  ]});

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.pass).then(
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

  test() {
    console.log(this.signUpForm.controls.email.valid);
  }
}
