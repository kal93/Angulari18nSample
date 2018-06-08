import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { TranslateService } from 'sqvue';

import { XLFLoader } from './app/loader';
// import { getTranslationProviders } from './app/i18n-providers';


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
//         const translations = loadXLF();
//         // require(`raw-loader!./locale/messages.xlf`);
// export function loadXLF() {
//   // const locale = document ['locale'] as string;
//   const locale = localStorage.getItem('localeId');
//   // below code can be replaced with i18n-providers, systemjs text plugin
//   if (!locale || locale == null) {
//     console.log(`${locale}..Inside main.ts load xlf..`);
//     const xlfFile = require(`raw-loader!./locale/messages.en.xlf`);
//     return xlfFile;
//   } else {
//     const xlfFile = require(`raw-loader!./locale/messages.${locale}.xlf`);
//     return xlfFile;
//   }
// }

  getTranslationProviders().then(providers => {
    const options = {providers };


platformBrowserDynamic().bootstrapModule(AppModule, options);
  // {
  // missingTranslation: MissingTranslationStrategy.Error,
  // providers: [
  //   {provide: TRANSLATIONS, useValue: translations},
  //   {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  // ]
  // }
// )
 // .catch(err => console.log(err));
});

export function getTranslationProviders(): Promise<Object[]> {
    let locale = 'en';
    const noProviders: Object[] = [];
    if (!locale || locale === 'en-US') {
      return Promise.resolve(noProviders);
    }
    const translationFile = `./locale/messages.${locale}.xlf`;
    return getTranslationsWithImports (translationFile)
          .then((translations: string)  => [
               { provide: TRANSLATIONS, useValue: translations},
              { provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
          ])
          .catch(() => noProviders);
}

  function getTranslationsWithImports(file: string) {
          const util = new XLFLoader();
          return util.loadXlfFile(file);
  }
