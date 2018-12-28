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

  private validationMessages: object = signUpValidation.messages;
  private errorMessage: string;
  private signUpForm = new FormGroup({
    email: new FormControl('', signUpValidation.emailValidators),
    password: new FormControl('', signUpValidation.passwordValidators),
    confirmPassword: new FormControl(''),
  }, { validators: signUpValidation.confirmPasswordValidators });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getInputClass(inputName: string) {
    const isValid = inputName === 'confirmPassword'
      ? !this.signUpForm.hasError('notSame')
      : this.signUpForm.controls[inputName].valid;
    return (
      isValid ||
      !( this.signUpForm.controls[inputName].dirty || this.signUpForm.controls[inputName].touched)
        ? 'valid'
        : 'invalid'
    );
  }

  checkIfHasError(inputName: string, validationType: string) {
    const input = inputName === 'confirmPassword'
      ? this.signUpForm
      : this.signUpForm.get(inputName);
    if (inputName === 'password') {
      // console.log(input.hasError(validationType));
    }
    return (
      input.hasError(validationType) &&
      (this.signUpForm.controls[inputName].dirty || this.signUpForm.controls[inputName].touched)
    );
  }

  signUp() {
    this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password).then(
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
