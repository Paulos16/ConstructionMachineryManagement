import { TestBed } from '@angular/core/testing';

import { DefinitionTasksService } from './definition-tasks.service';

describe('DefinitionTasksService', () => {
  let service: DefinitionTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinitionTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
