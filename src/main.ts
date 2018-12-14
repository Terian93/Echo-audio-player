import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire';

if (environment.production) {
  enableProdMode();
}

AngularFireModule.initializeApp(environment.firebase)

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
