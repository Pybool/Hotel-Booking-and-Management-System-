import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiconfigComponent } from './uiconfig.component';

describe('UiconfigComponent', () => {
  let component: UiconfigComponent;
  let fixture: ComponentFixture<UiconfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiconfigComponent]
    });
    fixture = TestBed.createComponent(UiconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
