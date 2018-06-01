import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { getLocaleCurrencySymbol, getLocaleCurrencyName } from '@angular/common';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  transform(value: number): any {
    return getLocaleCurrencySymbol(this.locale)  + new Intl.NumberFormat(this.locale, { style: 'decimal', minimumFractionDigits: 2 })
                                  .format(value);
  }

}
