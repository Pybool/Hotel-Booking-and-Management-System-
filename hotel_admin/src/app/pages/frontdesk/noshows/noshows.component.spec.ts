import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoshowsComponent } from './noshows.component';

describe('NoshowsComponent', () => {
  let component: NoshowsComponent;
  let fixture: ComponentFixture<NoshowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoshowsComponent]
    });
    fixture = TestBed.createComponent(NoshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
