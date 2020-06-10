import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  selections = ['machines', 'machine-types', 'applications', 'definitions', 'inspections'];
  selectedTab: string;

  constructor() { }

  ngOnInit(): void {
    this.selectedTab = this.selections[2];
  }

  selectTab(selection: number) {
    if (selection >= this.selections.length)
      selection = 0;

    this.selectedTab = this.selections[selection];
  }
}
