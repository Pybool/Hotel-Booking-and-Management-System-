import { TestBed } from '@angular/core/testing';

import { SalaryAllowanceService } from './salary-allowance.service';

describe('SalaryAllowanceService', () => {
  let service: SalaryAllowanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryAllowanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
