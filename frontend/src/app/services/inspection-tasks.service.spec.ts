import { TestBed } from '@angular/core/testing';

import { InspectionTasksService } from './inspection-tasks.service';

describe('InspectionTasksService', () => {
  let service: InspectionTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
