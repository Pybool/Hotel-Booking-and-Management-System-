import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingCheckInsComponent } from './upcoming-check-ins.component';

describe('UpcomingCheckInsComponent', () => {
  let component: UpcomingCheckInsComponent;
  let fixture: ComponentFixture<UpcomingCheckInsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingCheckInsComponent]
    });
    fixture = TestBed.createComponent(UpcomingCheckInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
