import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DefinitionsService } from 'src/app/services/definitions.service';
import { MachineTypesService } from 'src/app/services/machine-types.service';
import { Definition } from 'src/app/models/definition';
import { MachineType } from 'src/app/models/machine-type';
import { MachineTypePipe } from './../../../pipes/machine-type.pipe';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.css']
})
export class DefinitionsComponent implements OnInit {
  dataSource = new MatTableDataSource<Definition>();
  displayedColumns: string[] = ['IdDefinicja', 'RodzajMaszyny', 'DokumentDefinicji'];

  definitionForm: FormGroup;
  definitionSendingFailed: boolean;

  machineTypes: MachineType[];

  constructor(
    private formBuilder: FormBuilder,
    private definitionsService: DefinitionsService,
    private machineTypesService: MachineTypesService
  ) { }

  ngOnInit(): void {
    this.definitionForm = this.formBuilder.group({
      machineType: ['', Validators.required],
      definitionDocument: ['', Validators.required]
    });

    this.getDefinitions();
    this.getMachineTypes();
  }

  getDefinitions(): void {
    this.definitionsService.getDefinitions()
      .subscribe(definitions => this.dataSource.data = definitions);
  }

  getMachineTypes(): void {
    this.machineTypesService.getMachineTypes()
      .subscribe(machineTypes => this.machineTypes = machineTypes);
  }

  onSubmit() {
    this.definitionSendingFailed = false;

    if (this.definitionForm.invalid) {
      this.definitionSendingFailed = true;
      return;
    }

    this.definitionsService.addNewDefinition(
      this.definitionForm.get('machineType').value,
      this.definitionForm.get('definitionDocument').value
    ).subscribe();
  }
}
