import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideChevronDown, lucideMapPin } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';

import { AppStore } from '../../core/store/app-store';
import { ArtistBio } from '../../shared/components/artist-bio/artist-bio';
import { TicketList } from '../../shared/components/ticket-list/ticket-list';
import { EventDetailsHeader } from '../../shared/components/event-details-header/event-details-header';
import { CartService } from '../../core/services/cart.service';
import { CartTicket } from '../../core/interfaces/cart.interface';
import { EventsDetailsService } from '../../core/services/events-details.service';

@Component({
  selector: 'app-event-details',
  imports: [NgIcon, HlmButtonImports, HlmIconImports, ArtistBio, TicketList, EventDetailsHeader],
  providers: [provideIcons({ lucideCalendar, lucideMapPin, lucideChevronDown })],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  readonly #eventsDetailsService = inject(EventsDetailsService);
  readonly #cartService = inject(CartService);

  public selectedEvent = this.#eventsDetailsService.selectedEvent;
  public selectedTicketsMap = this.#cartService.selectedTicketsMap();

  onTicketSelectionChange(selectedTickets: CartTicket): void {
    this.#cartService.updateCart(selectedTickets);
  }
}
