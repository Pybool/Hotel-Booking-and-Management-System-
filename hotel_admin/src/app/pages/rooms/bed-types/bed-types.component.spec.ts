import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedTypesComponent } from './bed-types.component';

describe('BedTypesComponent', () => {
  let component: BedTypesComponent;
  let fixture: ComponentFixture<BedTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BedTypesComponent]
    });
    fixture = TestBed.createComponent(BedTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
