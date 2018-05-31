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

//  let translations;
// if (locale === 'ar') {
//      this.translations = require(`raw-loader!./locale/messages.xlf`);
// }
// else {
//   this.translations = require(`raw-loader!./locale/messages.ar.xlf`);
// }
        const translations = loadXLF();
        // require(`raw-loader!./locale/messages.xlf`);
export function loadXLF() {
  // const locale = document ['locale'] as string;
  const locale = localStorage.getItem('localeId');
  if ( !locale || locale == null ) {
  console.log(`${locale}..Inside main.ts load xlf..`);
    const xlfFile = require(`raw-loader!./locale/messages.en.xlf`);
    return xlfFile;
  } else {  const xlfFile = require(`raw-loader!./locale/messages.${locale}.xlf`);
  return xlfFile; }
  }

platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error,
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
})
  .catch(err => console.log(err));
