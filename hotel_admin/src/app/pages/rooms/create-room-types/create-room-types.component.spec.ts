import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomTypesComponent } from './create-room-types.component';

describe('CreateRoomTypesComponent', () => {
  let component: CreateRoomTypesComponent;
  let fixture: ComponentFixture<CreateRoomTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoomTypesComponent]
    });
    fixture = TestBed.createComponent(CreateRoomTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
