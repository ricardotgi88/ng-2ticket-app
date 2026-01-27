import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { AppStore } from '../../core/store/app-store';
import { ArtistBio } from '../../shared/components/artist-bio/artist-bio';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideChevronDown, lucideMapPin } from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { TicketSelectorCard } from '../../shared/components/ticket-selector-card/ticket-selector-card';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-event-details',
  imports: [DatePipe, NgIcon, HlmButtonImports, HlmIconImports, ArtistBio, TicketSelectorCard],
  providers: [provideIcons({ lucideCalendar, lucideMapPin, lucideChevronDown })],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  readonly #appStore = inject(AppStore);

  public selectedEvent = this.#appStore.selectedEvent;
}
