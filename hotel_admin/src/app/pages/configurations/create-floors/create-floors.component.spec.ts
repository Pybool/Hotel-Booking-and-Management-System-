import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFloorsComponent } from './create-floors.component';

describe('CreateFloorsComponent', () => {
  let component: CreateFloorsComponent;
  let fixture: ComponentFixture<CreateFloorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFloorsComponent]
    });
    fixture = TestBed.createComponent(CreateFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
