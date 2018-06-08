import { Component, NgModuleRef } from '@angular/core';
import { SqAppHeaderSettingsModel, TranslateService, WindowRefService } from 'sqvue';

import { Direction } from '@angular/cdk/bidi';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    dir: Direction = 'ltr';

    appHeaderSettings: SqAppHeaderSettingsModel = <SqAppHeaderSettingsModel>{};
    maaz: string;
    appLogo: string;
    constructor(private winRef: WindowRefService, private translate: TranslateService) {
        // const bLocale = localStorage.getItem('localeId');
        const bLocale = document ['locale'] as string;
        if (bLocale === 'ar') {
            this.winRef.nativeWindow.document.locale = bLocale;
            this.dir = 'rtl';
        }
        console.log('[CONSTRUCTOR CALLED]', this.winRef.nativeWindow.document.locale);
        const locale = document['locale'] as string;
        console.log(`AppModule Locale------------>${locale}`);
        translate.resxPath = `/assets/${locale}.json`;

        // app header config
        this.appLogo = 'assets/sunquest-logo.svg';
        this.maaz = this.translate.getResx('Maaz');
        this.appHeaderSettings.selectedTab = this.translate.getResx('Tab1');
        this.appHeaderSettings.tabList = [
            {
                name: this.translate.getResx('Tab1'),
                path: 'tab1'
             },
            {
                name: this.translate.getResx('Tab2'),
                path: 'tab2'
            }
        ];
        this.appHeaderSettings.menuList = [
            {
                name: 'Ar',
                clickHandler: (event, item) => {
                    item.name = 'ar';
                    console.log(item.name + ' Clicked !!');
                    localStorage.setItem('localeId', item.name);
                    console.log('locale set to:' + item.name);
                    location.reload(true);
                }
            },
            {
                name: 'En',
                clickHandler: (event, item) => {
                    item.name = 'en';
                    console.log(item.name + ' Clicked !!');
                    localStorage.setItem('localeId', item.name);
                    console.log('locale set to:' + item.name);
                    location.reload(true);
                }
            }// ,
            // {
            //     name: 'Fr',
            //     clickHandler: (event, item) => {
            //         item.name = 'fr';
            //         console.log(item.name + ' Clicked !!');
            //         localStorage.setItem('localeId', item.name);
            //         console.log('locale set to:' + item.name);
            //         location.reload(true);
            //     }
            // }
        ];
    }

    public setLocale = (language) => {
        localStorage.setItem('localeId', language);
        console.log('locale set to:' + language);
        location.reload(true);
    }
}
