import { Component, NgModuleRef, NgZone } from '@angular/core';
import { SqAppHeaderSettingsModel, TranslateService, WindowRefService } from 'sqvue';

import { Direction } from '@angular/cdk/bidi';

import { WindowRef } from './window.service';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    dir: Direction = 'ltr';

  appHeaderSettings: SqAppHeaderSettingsModel = <SqAppHeaderSettingsModel>{};
  appLogo: string;
  constructor( private winRef: WindowRefService, private translate: TranslateService ) {
      const bLocale = localStorage.getItem('localeId');
      if (bLocale === 'ar') {
          this.winRef.nativeWindow.document.locale = bLocale;
          this.dir = 'rtl';
      }
    this.appLogo = 'assets/sunquest-logo.svg';
      this.appHeaderSettings.selectedTab = this.translate.getResx('Tab1');
     this.appHeaderSettings.tabList = [
      {
            name: this.translate.getResx('Tab1'),
             path: 'tab1'
         },
         {
          name: this.translate.getResx('Tab2'),
           clickHandler: ($event, tabItem) => {
               console.log(tabItem.name + ' Clicked !!');
               this.appHeaderSettings.selectedTab = tabItem.name;
           }
       }
     ];
     this.appHeaderSettings.menuList = [
         {
             name: this.translate.getResx('Help'),
             clickHandler: (event, item) => {
                 console.log(item.name + ' Clicked !!');
             }
         },
 ];

 // winRef.nativeWindow.document.locale = 'ar';
 console.log('[CONSTRUCTOR CALLED]', this.winRef.nativeWindow.document.locale);
 const locale = document['locale'] as string;
 console.log(`AppModule Locale------------>${locale}`);
 translate.resxPath = `/assets/${locale}.json`;
}

//     zone: NgZone;
// public setLocale = (locale) => {
//     console.log('[LOCALE SWITCH TRIGGERED] setting language value to ' + locale);
//     this.winRef.nativeWindow.document.locale = locale;
//    //  this.zone.run ( () => {
//     // let _platformRef: NgModuleRef<Object>;
//     // if (_platformRef) { _platformRef.destroy(); }
//     // platformBrowserDynamic()
//     // .bootstrapModule(AppModule)
//     // .then(platformRef => {
//     //     _platformRef = platformRef;
//     // });
//     // window.location.reload();
// // });
// }

public setLocale = (language) => {
    localStorage.setItem('localeId', language);
    console.log('locale set to:' + language);
    location.reload(true);
}
}
