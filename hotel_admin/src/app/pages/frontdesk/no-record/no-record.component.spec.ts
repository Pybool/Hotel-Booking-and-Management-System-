import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRecordComponent } from './no-record.component';

describe('NoRecordComponent', () => {
  let component: NoRecordComponent;
  let fixture: ComponentFixture<NoRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoRecordComponent]
    });
    fixture = TestBed.createComponent(NoRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
