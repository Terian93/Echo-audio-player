// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAxg8t7mgQk9qKE-Vs6pQ8Yc0BEoFcW-Ow',
    authDomain: 'echo-audio-player.firebaseapp.com',
    databaseURL: 'https://echo-audio-player.firebaseio.com',
    projectId: 'echo-audio-player',
    storageBucket: 'echo-audio-player.appspot.com',
    messagingSenderId: '648241943476'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
