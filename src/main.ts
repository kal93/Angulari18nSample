import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { TranslateService } from 'sqvue';


if (environment.production) {
  enableProdMode();
}

// use the require method provided by webpack
declare const require;
// we use the webpack raw-loader to return the content as a string
const locale = document ['locale'] as string;
// let translations;
// if (locale === 'ar') {
//      this.translations = require(`raw-loader!./locale/messages.xlf`);
// }
// else {
//   this.translations = require(`raw-loader!./locale/messages.ar.xlf`);
// }
        const translations = require(`raw-loader!./locale/messages.xlf`);
platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error,
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
})
  .catch(err => console.log(err));
