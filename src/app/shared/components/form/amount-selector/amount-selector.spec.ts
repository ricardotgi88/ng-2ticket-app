import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountSelector } from './amount-selector';

describe('AmountSelector', () => {
  let component: AmountSelector;
  let fixture: ComponentFixture<AmountSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(AmountSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
