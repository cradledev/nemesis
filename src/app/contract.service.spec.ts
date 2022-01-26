import { TestBed } from '@angular/core/testing';

import { ContractService } from './contract.service';

describe('ContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractService = TestBed.inject(ContractService);
    expect(service).toBeTruthy();
  });
});
