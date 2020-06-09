import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplicantService } from './../../services/applicant.service';
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
    private applicantService: ApplicantService
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
    this.applicantService.getMachineTypes()
      .subscribe(machineTypes => this.machineTypes = machineTypes);
  }

  onSubmit() {
    this.applicationSendingFailed = false;

    if (this.applicationForm.invalid) {
      return;
    }

    // this.authenticationService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate(['/']);
    //     },
    //     error => {
    //       alert('Logowanie nie powiodło się.');
    //       this.loginFailed = true;
    //     }
    //   );
  }
}
