import { inject, Injectable, signal } from '@angular/core';
import { finalize, tap } from 'rxjs';

import { Event } from '../data/models/event.interface';
import { PriceMap } from '../data/models/price-maps.interface';
import { TicketType } from '../data/models/ticket-type.interface';
import { TicketTypeDataService } from '../data/ticket-type.data.service';
import { AppStore } from '../store/app-store';

@Injectable({
  providedIn: 'root',
})
export class TicketTypesService {
  #store = inject(AppStore);
  #ticketTypeDataService = inject(TicketTypeDataService);

  isLoading = signal(false);

  public enrichData(): void {
    const ticketTypes = this.#store.ticketTypes();
    if (ticketTypes.length) {
      this.#enrichEventsWithTypes(ticketTypes);
      return;
    }

    this.isLoading.set(true);
    this.#ticketTypeDataService
      .getAllTicketTypes()
      .pipe(
        tap((ticketTypes) => this.#store.setTicketTypes(ticketTypes)),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((ticketTypes) => this.#enrichEventsWithTypes(ticketTypes));
  }

  #enrichEventsWithTypes(ticketTypes: TicketType[]): void {
    const events = this.#store.events().length
      ? this.#store.events()
      : this.#store.selectedEvent()
        ? [this.#store.selectedEvent()!]
        : [];

    if (!events.length || !ticketTypes.length) {
      return;
    }

    for (const event of events) {
      for (const place of event.places || []) {
        if (!place.priceMap) {
          continue;
        }

        this.#enrichPriceMapWithTypes(place.priceMap, ticketTypes, event);
      }
    }
  }

  #enrichPriceMapWithTypes(priceMap: PriceMap, ticketTypes: TicketType[], event: Event): void {
    if (this.#skipEnrich(priceMap)) {
      return;
    }

    const enrichedPriceMap = priceMap.mapping.map((mapping) => {
      const ticketType = ticketTypes.find((type) => type.id === mapping.ticketTypeId);
      if (ticketType) {
        mapping.ticketType = ticketType;
      }
      return mapping;
    });

    const enrichedPlaces = event.places?.map((place) => {
      if (place.priceMapId === priceMap.id) {
        place.priceMap = { ...priceMap, mapping: enrichedPriceMap };
      }
      return place;
    });

    this.#store.enrichEvent({ ...event, places: enrichedPlaces });
  }

  #skipEnrich(priceMap: PriceMap): boolean {
    return !priceMap.mapping || priceMap.mapping.every((item) => !!item.ticketType);
  }
}
