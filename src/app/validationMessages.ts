const validationMessages = {
  'email': [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Enter a valid email' }
  ],
  'password': [
    { type: 'required', message: 'Password is required' },
  ]
};
export default validationMessages;