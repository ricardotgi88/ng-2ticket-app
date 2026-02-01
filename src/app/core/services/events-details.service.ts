import { inject, Injectable, untracked } from '@angular/core';
import { catchError, finalize, map, Observable, of, take, tap } from 'rxjs';

import { Event } from '../../api/models/event.interface';
import { EventsDataService } from '../../api/services/events.data.service';
import { AppStore } from '../store/app-store';
import { PriceMapService } from './price-map.service';
import { TicketPackService } from './ticket-pack.service';

@Injectable({
  providedIn: 'root',
})
export class EventsDetailsService {
  #appStore = inject(AppStore);
  #eventDataService = inject(EventsDataService);
  #priceMapService = inject(PriceMapService);
  #ticketPackService = inject(TicketPackService);

  public resolveData(eventId: number): Observable<boolean> {
    const selectedEvent = this.#appStore.selectedEvent();

    if (!selectedEvent) {
      return this.#eventDataService.getById(eventId).pipe(
        tap((event) => this.#appStore.selectEvent(event)),
        take(1),
        map(() => true),
        catchError(() => of(false)),
      );
    }

    return of(true);
  }

  public monitorData(): void {
    this.#monitorPriceMaps();
    this.#monitorTicketPacks();
  }

  #monitorPriceMaps(): void {
    if (this.#appStore.isLoading()) {
      return;
    }

    const event = this.#appStore.selectedEvent();

    const hasAnyPriceMapNotLoaded = event?.places.some(
      (place) => place.priceMapId && !place.priceMap,
    );

    if (event && hasAnyPriceMapNotLoaded) {
      this.#enrichEventDetailsPriceMaps(event);
    }
  }

  #monitorTicketPacks(): void {
    if (this.#appStore.isLoading()) {
      return;
    }

    const event = this.#appStore.selectedEvent();

    const hasAnyTicketPackNotLoaded = event?.places.some(
      (place) => !Array.isArray(place.ticketPacks),
    );

    if (event && hasAnyTicketPackNotLoaded) {
      this.#enrichEventDetailsTicketPack(event);
    }
  }

  #enrichEventDetailsTicketPack(event: Event): void {
    if (!event.places?.length) {
      return;
    }

    untracked(() => this.#appStore.setLoading(true));

    this.#ticketPackService
      .loadTicketPackByEvent(event)
      .pipe(
        map((ticketPacks) => {
          const enrichedPlaces = event.places.map((place) => {
            const placeTicketPacks =
              ticketPacks.filter((tp) =>
                tp.events.some((tpe) => tpe.eventId === event.id && tpe.eventPlaceId === place.id),
              ) ?? [];
            return {
              ...place,
              ticketPacks: placeTicketPacks,
            };
          });

          const enrichedEvent = {
            ...event,
            places: enrichedPlaces,
          } as Event;

          return enrichedEvent;
        }),
        finalize(() => untracked(() => this.#appStore.setLoading(false))),
      )
      .subscribe((event) => untracked(() => this.#appStore.enrichSelectedEvent(event)));
  }

  #enrichEventDetailsPriceMaps(event: Event): void {
    if (!event.places?.length) {
      return;
    }

    this.#priceMapService
      .loadPriceMapsByEvent(event)
      .pipe(
        map((priceMaps) => {
          const enrichedPlaces = event.places.map((place, index) => {
            return {
              ...place,
              priceMap: priceMaps[index],
            };
          });

          const enrichedEvent = {
            ...event,
            places: enrichedPlaces,
          } as Event;

          return enrichedEvent;
        }),
      )
      .subscribe((event) => untracked(() => this.#appStore.enrichSelectedEvent(event)));
  }
}
