import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationsService } from 'src/app/services/applications.service';
import { MachineTypesService } from 'src/app/services/machine-types.service';
import { Application } from 'src/app/models/application';
import { MachineType } from 'src/app/models/machine-type';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  selections = ['applications', 'new-application'];
  selectedTab: string;

  dataSource = new MatTableDataSource<Application>();
  displayedColumns: string[] = ['IdWniosek', 'RodzajMaszyny', 'Rejestracja', 'Tresc', 'Status'];

  applicationForm: FormGroup;
  applicationSendingFailed: boolean;
  
  machineTypes: MachineType[];

  constructor(
    private formBuilder: FormBuilder,
    private machineTypesService: MachineTypesService,
    private applicationsService: ApplicationsService
  ) { }

  ngOnInit(): void {
    this.selectedTab = this.selections[0];

    this.applicationForm = this.formBuilder.group({
      machineType: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.getApplications();
    this.getMachineTypes();
  }

  selectTab(selection: number) {
    if (selection >= this.selections.length)
      selection = 0;

    this.selectedTab = this.selections[selection];
  }

  getApplications(): void {
    this.applicationsService.getApplications()
      .subscribe(applications => this.dataSource.data = applications);
  }

  getMachineTypes(): void {
    this.machineTypesService.getMachineTypes()
      .subscribe(machineTypes => this.machineTypes = machineTypes);
  }

  onSubmit() {
    this.applicationSendingFailed = false;

    if (this.applicationForm.invalid) {
      this.applicationSendingFailed = true;
      return;
    }

    this.applicationsService.addNewApplication(
        this.applicationForm.get('machineType').value,
        this.applicationForm.get('licenseNumber').value,
        this.applicationForm.get('content').value
      ).subscribe();
    }
}
