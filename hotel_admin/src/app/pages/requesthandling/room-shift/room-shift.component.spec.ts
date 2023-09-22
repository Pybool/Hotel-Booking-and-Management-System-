import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomShiftComponent } from './room-shift.component';

describe('RoomShiftComponent', () => {
  let component: RoomShiftComponent;
  let fixture: ComponentFixture<RoomShiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomShiftComponent]
    });
    fixture = TestBed.createComponent(RoomShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
