import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBedtypeComponent } from './create-bedtype.component';

describe('CreateBedtypeComponent', () => {
  let component: CreateBedtypeComponent;
  let fixture: ComponentFixture<CreateBedtypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBedtypeComponent]
    });
    fixture = TestBed.createComponent(CreateBedtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
