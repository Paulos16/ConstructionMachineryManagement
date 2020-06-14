import { Pipe, PipeTransform } from '@angular/core';
import { MachineType } from '../models/machine-type';

@Pipe({
  name: 'machineTypeName'
})
export class MachineTypePipe implements PipeTransform {

  transform(value: number, types: MachineType[]): string {
    if (value === null || value === undefined || String(value) === '')
      return 'Nieznany rodzaj pojazdu';

    return types[value-1].Nazwa;
  }
}
