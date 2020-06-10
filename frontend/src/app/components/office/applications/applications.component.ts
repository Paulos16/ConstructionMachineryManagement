import { ApplicationsService } from './../../../services/applications.service';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'IdWniosek', 'IdRodzajMaszyny', 'Rejestracja', 'Tresc'];
  dataSource: MatTableDataSource<Application>;
  selection = new SelectionModel<Application>(false, []);

  applications: Application[];

  constructor(
    private applicationsService: ApplicationsService
  ) { }

  ngOnInit(): void {
    this.getApplications();
    this.applications = [{ IdWniosek: 1, IdRodzajMaszyny: 1, Rejestracja: '', Tresc: '', IdZleceniaDefinicji: null }]
    console.log(this.applications);
    this.dataSource = new MatTableDataSource<Application>(this.applications);
  }

  getApplications(): void {
    this.applicationsService.getApplications()
      .subscribe(applications => this.applications = applications);
  }

  checkboxLabel(row?: Application): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.IdWniosek + 1}`;
  }
}
