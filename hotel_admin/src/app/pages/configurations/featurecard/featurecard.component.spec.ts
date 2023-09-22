import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturecardComponent } from './featurecard.component';

describe('FeaturecardComponent', () => {
  let component: FeaturecardComponent;
  let fixture: ComponentFixture<FeaturecardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturecardComponent]
    });
    fixture = TestBed.createComponent(FeaturecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
