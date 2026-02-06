import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionInput } from './accordion-input';

describe('AccordionInput', () => {
  let component: AccordionInput;
  let fixture: ComponentFixture<AccordionInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
