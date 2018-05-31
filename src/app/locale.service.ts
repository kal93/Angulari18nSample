

/**
 * NO LONGER REQUIRED
 */
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  get nativeWindow(): any {
    return _window();
  }

  // default locale
  public ln = 'en';


  constructor() {
    try {
       if (!isNullOrUndefined(this.nativeWindow.navigator.language) && this.nativeWindow.navigator.language !== '') {
        this.ln = this.nativeWindow.navigator.language;
      }
    } finally {}
  }
}

function _window(): any {
  // return the global native browser window object
  return window;
}
