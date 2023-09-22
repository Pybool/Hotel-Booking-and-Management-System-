import { TestBed } from '@angular/core/testing';

import { RoomXService } from './room-x.service';

describe('RoomXService', () => {
  let service: RoomXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
