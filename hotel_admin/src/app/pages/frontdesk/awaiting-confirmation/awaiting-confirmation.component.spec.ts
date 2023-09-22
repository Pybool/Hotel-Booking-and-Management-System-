import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingConfirmationComponent } from './awaiting-confirmation.component';

describe('AwaitingConfirmationComponent', () => {
  let component: AwaitingConfirmationComponent;
  let fixture: ComponentFixture<AwaitingConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwaitingConfirmationComponent]
    });
    fixture = TestBed.createComponent(AwaitingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
