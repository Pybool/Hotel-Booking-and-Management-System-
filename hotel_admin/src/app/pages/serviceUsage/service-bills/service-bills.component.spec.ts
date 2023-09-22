import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBillsComponent } from './service-bills.component';

describe('ServiceBillsComponent', () => {
  let component: ServiceBillsComponent;
  let fixture: ComponentFixture<ServiceBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceBillsComponent]
    });
    fixture = TestBed.createComponent(ServiceBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
