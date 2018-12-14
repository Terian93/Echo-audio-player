import { FormGroup, Validators } from '@angular/forms';

module signUpValidation {
  export const emailValidators = [
    Validators.required,
    Validators.maxLength(100),
    Validators.email,
  ];
  
  export const passValidators = [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(6)
  ];
  
  export function checkPassRepeat (group: FormGroup) {
    let pass = group.controls.pass.value;
    let confirmPass = group.controls.confirmPass.value;
    if (pass !== confirmPass) {
      console.log('checkPasswords');
    }
    return pass === confirmPass ? null : { notSame: true };
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
      { type: 'minLength', message: 'Password should be at least 6 caracters'}
    ],
    'confirmPassword' : [
      { type: 'notSame', message: 'Password fields is not equal'}
    ]
  };
}

export default signUpValidation;