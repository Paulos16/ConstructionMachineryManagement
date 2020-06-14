import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'takNie'
})
export class TakNiePipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    if (value === undefined || value === null)
      return '';

    return value ? 'Tak' : 'Nie';
  }

}
