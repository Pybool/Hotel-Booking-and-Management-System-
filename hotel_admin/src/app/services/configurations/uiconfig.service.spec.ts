import { TestBed } from '@angular/core/testing';

import { UiconfigService } from './uiconfig.service';

describe('UiconfigService', () => {
  let service: UiconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
