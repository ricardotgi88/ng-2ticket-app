import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSelectorCard } from './ticket-selector-card';

describe('TicketSelectorCard', () => {
  let component: TicketSelectorCard;
  let fixture: ComponentFixture<TicketSelectorCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSelectorCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketSelectorCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
