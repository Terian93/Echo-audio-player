import { Validators } from '@angular/forms';

module loginValidation {
  export const emailValidators = [
    Validators.required,
    Validators.email
  ]

  export const passwordValidators = [
    Validators.required
  ]

  export const messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
    ]
  };
}

export default loginValidation;