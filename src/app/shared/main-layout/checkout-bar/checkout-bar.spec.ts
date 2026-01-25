import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBar } from './checkout-bar';

describe('CheckoutBar', () => {
  let component: CheckoutBar;
  let fixture: ComponentFixture<CheckoutBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutBar],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
