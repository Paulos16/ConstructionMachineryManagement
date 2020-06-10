import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MachineTypesService } from 'src/app/services/machine-types.service';
import { ApplicationsService } from '../../services/applications.service';
import { MachineType } from './../../models/machine-type';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  applicationForm: FormGroup;
  applicationSendingFailed: boolean;
  
  machineTypes: MachineType[];

  constructor(
    private formBuilder: FormBuilder,
    private machineTypesService: MachineTypesService,
    private applicationsService: ApplicationsService
  ) { }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      machineType: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.getMachineTypes();
  }

  getMachineTypes(): void {
    this.machineTypesService.getMachineTypes()
      .subscribe(machineTypes => this.machineTypes = machineTypes);
  }

  onSubmit() {
    console.log('btn pressed');
    this.applicationSendingFailed = false;

    if (this.applicationForm.invalid) {
      this.applicationSendingFailed = true;
      return;
    }

    this.applicationsService.addNewApplication(
      this.applicationForm.get('machineType').value,
      this.applicationForm.get('licenseNumber').value,
      this.applicationForm.get('content').value
    );
  }
}
