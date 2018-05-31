import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  SqAppHeaderModule, SqTrasnlateModule, SqTextboxModule, SqButtonModule, SqSelectModule,
  SqCardModule, SqCheckboxModule, TranslateService, WindowRefService
} from 'sqvue';
import { Tab1Component } from './tab1/tab1.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar-AE';
import { ExtendedDatePipe } from './extended-date.pipe';
import { LocaleService } from './locale.service';
import { WindowRef } from './window.service';


export function initResx(resx: TranslateService) {
  // const locale = document['locale'] as string;
  const locale = localStorage.getItem('localeId');
  console.log(locale);
  if (locale !== undefined && locale !== null) {
    // provide the path for resource bundle/json file
    resx.resxPath = `/assets/${locale}.json`;
  } else {
    // default locale for the first load
    // path for resource bundle of default locale
    resx.resxPath = `/assets/en.json`;
  }
  console.log(resx.loadResx());
  return () => resx.loadResx();
}

registerLocaleData(localeAr, 'ar');
registerLocaleData(localeFr, 'fr');

const routes = [
  {
    path: 'tab1',
    component: Tab1Component
  },
  {
    path: 'tab2',
    component: Tab1Component
  },
  // Default route
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tab1'
  },
];
@NgModule({
  declarations: [
    AppComponent,
    Tab1Component,
    ExtendedDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    SqAppHeaderModule,
    SqTextboxModule,
    SqTrasnlateModule,
    SqCardModule,
    SqButtonModule,
    SqCheckboxModule,
    SqSelectModule
  ],
  providers: [TranslateService,
    {
      deps: [TranslateService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: initResx
    },
    // {
    //   provide: LOCALE_ID,
    //   useValue : 'en'
    //    deps: [LocaleService],
    //    useFactory :
    // },
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // locale: string;
  // localeData: any;
  // constructor() {
  //   const locale = document ['locale'] as string;

  //   switch (locale) {
  //       case 'ar':
  //       this.localeData = localeAr;
  //       registerLocaleData(this.localeData, locale);
  //       break;
  //       default:
  //       this.localeData = localeFr;
  //       registerLocaleData(this.localeData, locale);
  //   }
  // }

  constructor(private resx: TranslateService, private winRef: WindowRefService) {

    // winRef.nativeWindow.document.locale = 'ar';
    // console.log('[CONSTRUCTOR CALLED]', winRef.nativeWindow.document.locale);
    // const locale = document['locale'] as string;
    // console.log(`AppModule Locale------------>${locale}`);
    // resx.resxPath = `/assets/${locale}.json`;
  }

}
