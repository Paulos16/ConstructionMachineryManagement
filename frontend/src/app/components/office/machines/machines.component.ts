import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MachinesService } from 'src/app/services/machines.service';
import { MachineTypesService } from 'src/app/services/machine-types.service';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Machine } from 'src/app/models/machine';
import { MachineType } from 'src/app/models/machine-type';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  dataSource = new MatTableDataSource<Machine>();
  displayedColumns: string[] = ['IdMaszyna', 'IdRodzajMaszyny', 'Rejestracja', 'TerminWaznosciPrzegladu', 'CzyZdatna', 'Zdatnosc'];

  machineTypes: MachineType[];

  constructor(
    private machinesService: MachinesService,
    private machineTypesService: MachineTypesService,
    private applicationsService: ApplicationsService
  ) { }

  ngOnInit(): void {
    this.getMachines();
    this.getMachineTypes();
  }

  getMachines(): void {
    this.machinesService.getMachines(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
      .subscribe(machines => this.dataSource.data = machines);
  }

  setAsUnoperable(idMaszyna: number, idWniosek: number): void {
    this.machinesService.editMachineOperability(idMaszyna, false)
      .subscribe();

    if (idWniosek)
      this.applicationsService.editApplicationStatus(idWniosek, 'Maszyna niezdatna do dalszej eksploatacji')
        .subscribe();
  }

  getMachineTypes(): void {
    this.machineTypesService.getMachineTypes()
      .subscribe(machineTypes => this.machineTypes = machineTypes);
  }
}
