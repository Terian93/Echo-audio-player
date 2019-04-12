import { FormGroup, AbstractControl, Validators } from '@angular/forms';

module signUpValidation {
  export const emailValidators = [
    Validators.required,
    Validators.maxLength(100),
    Validators.email,
  ];

  export const passwordValidators = [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(6),
    passwordValidator
  ];

  export const confirmPasswordValidators = [
    checkPasswordRepeat
  ];

  function checkPasswordRepeat (group: FormGroup) {
    const password = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  function passwordValidator (control: AbstractControl) {
    const password = control.value;
    const pattern = new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d-]{2,}$/);
    return pattern.test(password) ? null : { pattern: true };
  }

  export interface Messages {
    email: Array<object>;
    password: Array<object>;
    confirmPassword: Array<object>;
  }

  export const messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'maxLength', message: 'Email is out of length limit'},
      { type: 'email', message: 'Enter a valid email' },
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'maxLength', message: 'Password is out of length limit'},
      { type: 'minlength', message: 'Password should be at least 6 caracters'},
      { type: 'pattern', message: 'Password should have at least one uppercase letter and one digit'}
    ],
    'confirmPassword' : [
      { type: 'notSame', message: 'Password fields should be equal'}
    ]
  };
}

export default signUpValidation;
