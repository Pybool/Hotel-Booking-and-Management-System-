import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCheckoutComponent } from './recent-checkout.component';

describe('RecentCheckoutComponent', () => {
  let component: RecentCheckoutComponent;
  let fixture: ComponentFixture<RecentCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentCheckoutComponent]
    });
    fixture = TestBed.createComponent(RecentCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
