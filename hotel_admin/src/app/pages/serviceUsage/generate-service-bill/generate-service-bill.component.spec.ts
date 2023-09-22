import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateServiceBillComponent } from './generate-service-bill.component';

describe('GenerateServiceBillComponent', () => {
  let component: GenerateServiceBillComponent;
  let fixture: ComponentFixture<GenerateServiceBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateServiceBillComponent]
    });
    fixture = TestBed.createComponent(GenerateServiceBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
