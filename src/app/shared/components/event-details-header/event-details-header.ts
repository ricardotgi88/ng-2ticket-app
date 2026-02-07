import { Component, Input, OnChanges, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideMapPin } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';

import { Event } from '../../../api/models/event.interface';
import { Place } from '../../../api/models/place.interface';
import { EventDatePipe } from '../../../core/pipes/event-date-pipe';

@Component({
  selector: 'app-event-details-header',
  imports: [EventDatePipe, NgIcon, HlmIconImports],
  providers: [provideIcons({ lucideCalendar, lucideMapPin })],
  templateUrl: './event-details-header.html',
  styleUrl: './event-details-header.css',
})
export class EventDetailsHeader implements OnChanges {
  @Input() event: Event | null = null;
  @Input() place: Place | null = null;

  daysToEvenet = signal<number>(0);

  ngOnChanges(): void {
    if (this.event?.eventTime) {
      this.daysToEvenet.set(this.#calcDaysFromNow(this.event.eventTime));
    } else {
      this.daysToEvenet.set(0);
    }
  }

  #calcDaysFromNow(dateString: string): number {
    const eventDate = new Date(dateString);
    const currentDate = new Date();

    // Clear the time portion for accurate day difference
    eventDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const timeDiff = eventDate.getTime() - currentDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return Math.max(0, dayDiff);
  }
}
