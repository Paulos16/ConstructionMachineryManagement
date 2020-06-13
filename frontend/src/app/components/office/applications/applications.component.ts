import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ApplicationsService } from './../../../services/applications.service';
import { MachineTypesService } from 'src/app/services/machine-types.service';
import { Application } from 'src/app/models/application';
import { MachineType } from 'src/app/models/machine-type';
import { MachineTypePipe } from './../../../pipes/machine-type.pipe';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  dataSource = new MatTableDataSource<Application>();
  displayedColumns: string[] = ['IdWniosek', 'RodzajMaszyny', 'Rejestracja', 'Tresc', 'Poprawnosc'];

  machineTypes: MachineType[];

  constructor(
    private applicationsService: ApplicationsService,
    private machineTypesService: MachineTypesService
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

  acceptApplication(idWniosek: number) {
    this.applicationsService.editApplication(idWniosek, true).subscribe();
  }

  declineApplication(idWniosek: number) {
    this.applicationsService.editApplication(idWniosek, false).subscribe();
  }
}
