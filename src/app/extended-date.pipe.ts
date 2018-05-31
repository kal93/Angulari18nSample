import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'extendedDate',
  pure: true
})
export class ExtendedDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, pattern?: string, timeZone?: string, locale?: string): string | null {
    console.log(`Inside Extended Date Pipe  value----> ${value}, pattern---->${pattern}, timeZone-----> ${timeZone}, locale---->${locale}`);
    if (!locale) {
      locale = document['locale'] as string;
    }
    return super.transform(value, pattern, timeZone, locale);
  }

}
