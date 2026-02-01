import { inject, Injectable, signal } from '@angular/core';
import { finalize, Observable, of, tap } from 'rxjs';

import { Event } from '../../api/models/event.interface';
import { Place } from '../../api/models/place.interface';
import { TicketType } from '../../api/models/ticket-type.interface';
import { TicketTypeDataService } from '../../api/services/ticket-type.data.service';
import { AppStore } from '../store/app-store';

type TicketRef = { ticketTypeId: number; ticketType?: TicketType };

@Injectable({
  providedIn: 'root',
})
export class TicketTypesService {
  #store = inject(AppStore);
  #ticketTypeDataService = inject(TicketTypeDataService);

  isLoading = signal(false);

  public enrichData(): void {
    if (this.isLoading()) {
      return;
    }

    const selectedEvent = this.#store.selectedEvent();

    const needEnrichement = selectedEvent?.places.some(
      (place) =>
        this.#needEnrichement(place.ticketPacks) || this.#needEnrichement(place.priceMap?.mapping),
    );

    if (needEnrichement) {
      this.#getTicketTypes().subscribe((ticketTypes) =>
        this.#enrichEventWithTicketTypes(ticketTypes, selectedEvent!),
      );
    }
  }

  #getTicketTypes(): Observable<TicketType[]> {
    const ticketTypes = this.#store.ticketTypes();
    if (ticketTypes.length) {
      return of(ticketTypes);
    }

    this.isLoading.set(true);

    return this.#ticketTypeDataService.getAll().pipe(
      tap((ticketTypes) => this.#store.setTicketTypes(ticketTypes)),
      finalize(() => this.isLoading.set(false)),
    );
  }

  #enrichEventWithTicketTypes(ticketTypes: TicketType[], event: Event): void {
    const enrichedPlaces: Place[] = [];

    for (const place of event.places || []) {
      const hydratedMapping = this.#hidrateTicketType(place.priceMap?.mapping, ticketTypes);

      const hydratedTicketPacks = place.ticketPacks
        ? this.#hidrateTicketType(place.ticketPacks, ticketTypes)
        : null;

      const enrichedPlace: Place = {
        ...place,
        priceMap: {
          ...place.priceMap,
          mapping: hydratedMapping,
        },
        ticketPacks: hydratedTicketPacks,
      };

      enrichedPlaces.push(enrichedPlace);
    }

    this.#store.enrichSelectedEvent({ ...event, places: enrichedPlaces });
  }

  #needEnrichement<T extends TicketRef>(
    arrayWithTicketType: T[] | null,
  ): arrayWithTicketType is T[] {
    return (
      Array.isArray(arrayWithTicketType) &&
      arrayWithTicketType.length > 0 &&
      arrayWithTicketType.every((item) => !item.ticketType)
    );
  }

  #hidrateTicketType<T extends TicketRef>(
    arrayToFeed: T[],
    ticketTypesRegistry: TicketType[],
  ): T[] {
    const enrichedArray: T[] = arrayToFeed.map((array) => {
      const ticketType = ticketTypesRegistry.find((type) => type.id === array.ticketTypeId);
      if (ticketType) {
        array.ticketType = ticketType;
      }
      return array;
    });

    return enrichedArray;
  }
}
