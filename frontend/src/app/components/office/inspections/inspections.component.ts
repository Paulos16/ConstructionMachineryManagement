import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InspectionsService } from 'src/app/services/inspections.service';
import { MachinesService } from 'src/app/services/machines.service';
import { Inspection } from 'src/app/models/inspection';
import { Machine } from 'src/app/models/machine';
import { MachinePipe } from './../../../pipes/machine.pipe';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})
export class InspectionsComponent implements OnInit {
  dataSource = new MatTableDataSource<Inspection>();
  displayedColumns: string[] = ['IdPrzeglad', 'Maszyna', 'DokumentPrzegladu', 'CzyZrobiony'];

  inspectionForm: FormGroup;
  inspectionSendingFailed: boolean;

  machines: Machine[];

  constructor(
    private formBuilder: FormBuilder,
    private inspectionsService: InspectionsService,
    private machinesService: MachinesService
  ) { }

  ngOnInit(): void {
    this.inspectionForm = this.formBuilder.group({
      machine: ['', Validators.required],
      inspectionDocument: ['', Validators.required],
      isDone: ['', Validators.required]
    });

    this.getInspections();
    this.getMachines();
  }

  getInspections(): void {
    this.inspectionsService.getInspections()
      .subscribe(inspections => this.dataSource.data = inspections);
  }

  getMachines(): void {
    this.machinesService.getMachines(formatDate(new Date(), 'yyyy-MM-dd', 'pl'))
      .subscribe(machines => this.machines = machines);
  }

  onSubmit() {
    this.inspectionSendingFailed = false;

    if (this.inspectionForm.invalid) {
      this.inspectionSendingFailed = true;
      return;
    }

    this.inspectionsService.addNewCorrectInspection(
      this.inspectionForm.get('machine').value,
      this.inspectionForm.get('inspectionDocument').value
    ).subscribe();

    let ymd = formatDate(new Date(), 'yyyy-MM-dd', 'pl').split('-');
    let yearAfter = String(parseInt(ymd[0]) + 1) + '-' + ymd[1] + '-' + ymd[2];
    this.machinesService.editMachineNextInspection(
        this.inspectionForm.get('machine').value,
        yearAfter
      ).subscribe();
  }
}
