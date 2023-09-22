import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAmenitiesComponent } from './create-amenities.component';

describe('CreateAmenitiesComponent', () => {
  let component: CreateAmenitiesComponent;
  let fixture: ComponentFixture<CreateAmenitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAmenitiesComponent]
    });
    fixture = TestBed.createComponent(CreateAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
