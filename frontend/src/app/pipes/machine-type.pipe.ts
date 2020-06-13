import { Pipe, PipeTransform } from '@angular/core';
import { MachineType } from '../models/machine-type';

@Pipe({
  name: 'machineTypeName'
})
export class MachineTypePipe implements PipeTransform {

  transform(value: number, types: MachineType[]): string {
    return types[value-1].Nazwa;
  }
}
