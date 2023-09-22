import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCheckInsComponent } from './active-check-ins.component';

describe('ActiveCheckInsComponent', () => {
  let component: ActiveCheckInsComponent;
  let fixture: ComponentFixture<ActiveCheckInsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveCheckInsComponent]
    });
    fixture = TestBed.createComponent(ActiveCheckInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
