import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  selections = ['applications', 'definitions', 'inspections', 'machines', 'machine-types'];
  selectedTab: string;

  constructor() { }

  ngOnInit(): void {
    this.selectedTab = this.selections[0];
  }

  selectTab(selection: number) {
    if (selection >= this.selections.length)
      selection = 0;

    this.selectedTab = this.selections[selection];
  }
}
