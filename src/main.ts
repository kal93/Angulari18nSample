import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, MissingTranslationStrategy, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

// use the require method provided by webpack
declare const require;
// we use the webpack raw-loader to return the content as a string

const translations = loadXLF();
export function loadXLF() {
  const locale = window.navigator.language;
  // const locale = localStorage.getItem('localeId');
  // below code can be replaced with i18n-providers, systemjs text plugin
  if (!locale || locale == null || locale === 'en-US') {
    console.log(`${locale}..Inside main.ts load xlf..`);
    const xlfFile = require(`raw-loader!./locale/messages.en.xlf`);
    return xlfFile;
  } else {
    const xlfFile = require(`raw-loader!./locale/messages.${locale}.xlf`);
    return xlfFile;
  }
}


platformBrowserDynamic().bootstrapModule(AppModule,
  {
    missingTranslation: MissingTranslationStrategy.Error,
    providers: [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' }
    ]
  }
)
  .catch(err => console.log(err));
