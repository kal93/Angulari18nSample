import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LocaleService } from './locale.service';

@Pipe({
  name: 'extendedDate',
  pure: true
})
export class ExtendedDatePipe extends DatePipe implements PipeTransform {

  // constructor(private loc: LocaleService) {
  //   super(loc.ln);
  //  // console.log(` ${JSON.stringify(loc)}`);
  // }

  transform(value: any, pattern?: string, timeZone?: string, locale?: string): string | null {
    console.log(`value----> ${value}, pattern---->${pattern}, timeZone-----> ${timeZone}, locale---->${locale}`);
    if (!locale) {
      locale = document ['locale'] as string;
    }
    return super.transform(value, pattern, timeZone, locale);
  }

}
