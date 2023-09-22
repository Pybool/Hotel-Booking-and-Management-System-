import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedComplaintsComponent } from './raised-complaints.component';

describe('RaisedComplaintsComponent', () => {
  let component: RaisedComplaintsComponent;
  let fixture: ComponentFixture<RaisedComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaisedComplaintsComponent]
    });
    fixture = TestBed.createComponent(RaisedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
