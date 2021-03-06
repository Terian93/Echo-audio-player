import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import signUpValidation from './validation';

@Component({
  selector: 'app-registration-route',
  templateUrl: './registration-route.component.html',
  styleUrls: ['./registration-route.component.scss']
})
export class RegistrationRouteComponent implements OnInit {

  public validationMessages: signUpValidation.Messages = signUpValidation.messages;
  public errorMessage: string;
  public signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', signUpValidation.emailValidators],
      password: ['', signUpValidation.passwordValidators],
      confirmPassword: [''],
    }, { validators: signUpValidation.confirmPasswordValidators });
  }

  ngOnInit() {
  }

  isValid(inputName: string) {
    const isValid = inputName === 'confirmPassword'
      ? !this.signUpForm.hasError('notSame')
      : this.signUpForm.controls[inputName].valid;
    return (
      !isValid &&
      ( this.signUpForm.controls[inputName].dirty || this.signUpForm.controls[inputName].touched)
        ? true
        : false
    );
  }

  checkIfHasError(inputName: string, validationType: string) {
    const input = inputName === 'confirmPassword'
      ? this.signUpForm
      : this.signUpForm.get(inputName);
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
