import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MachineTypesService } from 'src/app/services/machine-types.service';
import { MachineType } from 'src/app/models/machine-type';

@Component({
  selector: 'app-machine-types',
  templateUrl: './machine-types.component.html',
  styleUrls: ['./machine-types.component.css']
})
export class MachineTypesComponent implements OnInit {
  dataSource = new MatTableDataSource<MachineType>();
  displayedColumns: string[] = ['IdRodzajMaszyny', 'Nazwa'];

  constructor(
    private machineTypesService: MachineTypesService
  ) { }

  ngOnInit(): void {
    this.getMachineTypes();
  }

  getMachineTypes(): void {
    this.machineTypesService.getMachineTypes()
      .subscribe(machineTypes => this.dataSource.data = machineTypes);
  }
}
