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
import localeIN from '@angular/common/locales/en-IN';
import { ExtendedDatePipe } from './extended-date.pipe';
import { ExtendedCurrencyPipe } from './extended-currency.pipe';
import { Tab2Component } from './tab2/tab2.component';

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

const locale = localStorage.getItem('localeId');

// let locale22;

registerLocaleData(localeAr, 'ar');
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeIN, 'ind');

const routes = [
  {
    path: 'tab1',
    component: Tab1Component
  },
  {
    path: 'tab2',
    component: Tab2Component
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
    ExtendedDatePipe,
    ExtendedCurrencyPipe,
    Tab2Component
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
    {
      provide: LOCALE_ID,
      useValue: locale
    },
    WindowRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
