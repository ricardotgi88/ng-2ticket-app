import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideChevronDown, lucideMapPin } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';

import { AppStore } from '../../core/store/app-store';
import { ArtistBio } from '../../shared/components/artist-bio/artist-bio';
import { TicketList } from '../../shared/components/ticket-list/ticket-list';

@Component({
  selector: 'app-event-details',
  imports: [DatePipe, NgIcon, HlmButtonImports, HlmIconImports, ArtistBio, TicketList],
  providers: [provideIcons({ lucideCalendar, lucideMapPin, lucideChevronDown })],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  readonly #appStore = inject(AppStore);

  public selectedEvent = this.#appStore.selectedEvent;
}
