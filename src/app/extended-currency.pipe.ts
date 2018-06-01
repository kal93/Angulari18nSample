import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'extendedCurrency',
  pure: true
})
export class ExtendedCurrencyPipe extends CurrencyPipe implements PipeTransform {

  transform(value: any, code?: string, displayVal?: 'code'|'symbol'|'symbol-narrow'|string|boolean, 
  digitsInf?: string, localeId?: string): string | null {

    if (!localeId) {
      localeId = document['locale'] as string;
      console.log(`${localeId} from Extended Currency Pipe`);
    }
    return super.transform(value, code, displayVal, digitsInf, localeId);
  }

}
