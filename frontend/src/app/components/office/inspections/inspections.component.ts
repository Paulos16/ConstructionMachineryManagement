import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InspectionsService } from 'src/app/services/inspections.service';
import { MachinesService } from 'src/app/services/machines.service';
import { InspectionTasksService } from 'src/app/services/inspection-tasks.service';
import { ApplicationsService } from 'src/app/services/applications.service';
import { Inspection } from 'src/app/models/inspection';
import { Machine } from 'src/app/models/machine';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {
  dataSource = new MatTableDataSource<Inspection>();
  displayedColumns: string[] = ['IdPrzeglad', 'Maszyna', 'DokumentPrzegladu', 'CzyZrobiony'];

  newInspectionForm: FormGroup;
  newInspectionSendingFailed: boolean;
  inspectionCorrectForm: FormGroup;
  inspectionCorrectSendingFailed: boolean;

  inspections: Inspection[];
  machines: Machine[];

  constructor(
    private formBuilder: FormBuilder,
    private inspectionsService: InspectionsService,
    private machinesService: MachinesService,
    private inspectionTasksService: InspectionTasksService,
    private applicationsService: ApplicationsService
  ) { }

  ngOnInit(): void {
    this.inspectionCorrectForm = this.formBuilder.group({
      inspection: ['', Validators.required],
      inspectionDocument: ['', Validators.required]
    });

    this.newInspectionForm = this.formBuilder.group({
      machine: ['', Validators.required],
      inspectionDocument: ['', Validators.required]
    });

    this.getInspections();
    this.getMachines();
  }

  getInspections(): void {
    this.inspectionsService.getInspections()
      .subscribe(inspections => {
        this.dataSource.data = inspections;
        this.inspections = inspections;
      });
  }

  getMachines(): void {
    this.machinesService.getMachines(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
      .subscribe(machines => this.machines = machines);
  }

  onSubmitCorrect() {
    this.inspectionCorrectSendingFailed = false;

    if (this.inspectionCorrectForm.invalid) {
      this.inspectionCorrectSendingFailed = true;
      return;
    }
    
    this.inspectionsService.editCorrectInspection(
      this.inspectionCorrectForm.get('inspection').value[0],
      this.inspectionCorrectForm.get('inspectionDocument').value
    ).subscribe();

    let ymd = formatDate(new Date(), 'yyyy-MM-dd', 'en').split('-');
    let yearAfter = String(parseInt(ymd[0]) + 1) + '-' + ymd[1] + '-' + ymd[2];
    console.log(yearAfter);
    this.machinesService.editMachineNextInspection(
        this.inspectionCorrectForm.get('inspection').value[2],
        yearAfter
      ).subscribe();
    
    if (this.inspectionCorrectForm.get('inspection').value[4])
      this.applicationsService.editApplicationStatus(
          this.inspectionCorrectForm.get('inspection').value[4],
          'Przegląd zakończony pomyślnie'
        ).subscribe();
  }

  onSubmitNew() {
    this.newInspectionSendingFailed = false;

    if (this.newInspectionForm.invalid) {
      this.newInspectionSendingFailed = true;
      return;
    }

    this.inspectionsService.addNewInspection(
        this.newInspectionForm.get('machine').value[0],
        this.newInspectionForm.get('inspectionDocument').value,
        this.newInspectionForm.get('machine').value[2]
      ).subscribe();

    this.inspectionTasksService.addNewInspectionTask(
        this.newInspectionForm.get('machine').value[0],
        this.newInspectionForm.get('inspectionDocument').value
      ).subscribe();

    if (this.newInspectionForm.get('machine').value[2])
      this.applicationsService.editApplicationStatus(
          this.newInspectionForm.get('machine').value[2],
          'Przegląd w trakcie'
        ).subscribe();
  }
}
