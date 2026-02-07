import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsHeader } from './event-details-header';

describe('EventDetailsHeader', () => {
  let component: EventDetailsHeader;
  let fixture: ComponentFixture<EventDetailsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
