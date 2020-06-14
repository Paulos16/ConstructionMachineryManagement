import { Pipe, PipeTransform } from '@angular/core';
import { Machine } from '../models/machine';

@Pipe({
  name: 'machineName'
})
export class MachinePipe implements PipeTransform {

  transform(value: number, types: Machine[]): string {
    if (value === null || value === undefined || String(value) === '')
      return 'Nieznana rejestracja pojazdu';

    return types[value-1].Rejestracja;
  }
}
