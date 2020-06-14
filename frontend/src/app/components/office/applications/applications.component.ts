import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationsService } from 'src/app/services/applications.service';
import { MachineTypesService } from 'src/app/services/machine-types.service';
import { MachinesService } from 'src/app/services/machines.service';
import { Application } from 'src/app/models/application';
import { MachineType } from 'src/app/models/machine-type';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Application>();
  displayedColumns: string[] = ['IdWniosek', 'RodzajMaszyny', 'Rejestracja', 'Tresc', 'Status', 'Poprawnosc'];

  machineTypes: MachineType[];

  constructor(
    private applicationsService: ApplicationsService,
    private machineTypesService: MachineTypesService,
    private machinesService: MachinesService
    ) { }

  ngOnInit(): void {
    this.getApplications();
    this.getMachineTypes();
  }

  getApplications(): void {
    this.applicationsService.getApplications()
      .subscribe(applications => this.dataSource.data = applications);
  }

  getMachineTypes(): void {
    this.machineTypesService.getMachineTypes()
      .subscribe(machineTypes => this.machineTypes = machineTypes);
  }

  acceptApplication(wniosek: Application) {
    this.applicationsService.editApplicationApproval(wniosek.IdWniosek, true)
      .subscribe();
    this.applicationsService.editApplicationStatus(wniosek.IdWniosek, 'Zatwierdzony')
      .subscribe();
    
    this.machinesService.addNewMachine(wniosek.IdRodzajMaszyny, wniosek.Rejestracja, formatDate(new Date(), 'yyyy-MM-dd', 'en'), wniosek.IdWniosek)
      .subscribe();
  }

  declineApplication(idWniosek: number) {
    this.applicationsService.editApplicationApproval(idWniosek, false)
      .subscribe();
    this.applicationsService.editApplicationStatus(idWniosek, 'Odrzucony')
      .subscribe();
  }
}
