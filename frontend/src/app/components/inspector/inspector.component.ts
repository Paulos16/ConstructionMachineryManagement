import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionTasksService } from 'src/app/services/definition-tasks.service';
import { InspectionTasksService } from 'src/app/services/inspection-tasks.service';
import { MachineTypesService } from 'src/app/services/machine-types.service';
import { MachinesService } from 'src/app/services/machines.service';
import { DefinitionTask } from 'src/app/models/definition-task';
import { InspectionTask } from 'src/app/models/inspection-task';
import { MachineType } from 'src/app/models/machine-type';
import { Machine } from 'src/app/models/machine';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit {
  selections = ['definition-tasks', 'inspection-tasks'];
  selectedTab: string;

  definitionTasksDataSource = new MatTableDataSource<DefinitionTask>();
  definitionTasksDisplayedColumns: string[] = ['IdZlecenieDefinicji', 'RodzajMaszyny', 'Data'];

  inspectionTasksDataSource = new MatTableDataSource<InspectionTask>();
  inspectionTasksDisplayedColumns: string[] = ['IdZleceniaPrzegladu', 'Rejestracja', 'Data', 'Dokument'];

  machineTypes: MachineType[];
  machines: Machine[];

  constructor(
    private definitionTasksService: DefinitionTasksService,
    private inspectionTasksService: InspectionTasksService,
    private machineTypesService: MachineTypesService,
    private machinesService: MachinesService,
  ) { }

  ngOnInit(): void {
    this.selectedTab = this.selections[0];

    this.getDefinitionTasks();
    this.getInspectionTasks();
    this.getMachineTypes();
    this.getMachines();
  }

  selectTab(selection: number) {
    if (selection >= this.selections.length)
      selection = 0;

    this.selectedTab = this.selections[selection];
  }

  getDefinitionTasks(): void {
    this.definitionTasksService.getDefinitionTasks()
      .subscribe(definitionTasks => this.definitionTasksDataSource.data = definitionTasks);
  }

  getInspectionTasks(): void {
    this.inspectionTasksService.getInspectionTasks()
      .subscribe(inspectionTasks => this.inspectionTasksDataSource.data = inspectionTasks);
  }

  getMachineTypes(): void {
    this.machineTypesService.getMachineTypes()
      .subscribe(machineTypes => this.machineTypes = machineTypes);
  }

  getMachines(): void {
    this.machinesService.getMachines(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
      .subscribe(machines => this.machines = machines);
  }
}
