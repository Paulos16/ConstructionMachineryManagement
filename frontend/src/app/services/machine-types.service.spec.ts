import { TestBed } from '@angular/core/testing';

import { MachineTypesService } from './machine-types.service';

describe('MachineTypeService', () => {
  let service: MachineTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
