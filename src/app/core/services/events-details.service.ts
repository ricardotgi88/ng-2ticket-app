import { inject, Injectable } from '@angular/core';
import { catchError, finalize, forkJoin, map, Observable, of, switchMap, take, tap } from 'rxjs';

import { EventsDataService } from '../data/events.data.service';
import { Event } from '../data/models/event.interface';
import { PriceMapDataService } from '../data/price-maps.data.service';
import { AppStore } from '../store/app-store';

@Injectable({
  providedIn: 'root',
})
export class EventsDetailsService {
  #appStore = inject(AppStore);
  #eventDataService: EventsDataService = inject(EventsDataService);
  #priceMapDataService = inject(PriceMapDataService);

  public resolveData(eventId: string): Observable<boolean> {
    const selectedEvent = this.#appStore.selectedEvent();
    let request: Observable<Event> | undefined = undefined;

    if (!selectedEvent) {
      request = this.#eventDataService.getEventById(eventId).pipe(
        switchMap((event) => this.#loadEventPriceMap(event)),
        tap((event) => this.#appStore.selectEvent(event)),
      );
    }

    if (selectedEvent?.places?.length && selectedEvent.places.every((place) => !place.priceMap)) {
      request = this.#loadEventPriceMap(selectedEvent).pipe(
        tap((event) => this.#appStore.enrichSelectedEvent(event)),
      );
    }

    if (request) {
      return request.pipe(
        take(1),
        map(() => true),
        catchError(() => of(false)),
      );
    }

    return of(true);
  }

  #loadEventPriceMap(selectedEvent: Event): Observable<Event> {
    if (!selectedEvent.places?.length) {
      return of(selectedEvent);
    }

    const priceMapsRequests$ = selectedEvent.places?.map((place) =>
      this.#priceMapDataService.getPriceMapById(place.priceMapId),
    );

    this.#appStore.setLoading(true);

    return forkJoin(priceMapsRequests$).pipe(
      map((priceMaps) => {
        const enrichedPlaces = selectedEvent.places.map((place, index) => {
          return {
            ...place,
            priceMap: priceMaps[index],
          };
        });

        const enrichedEvent = {
          ...selectedEvent,
          places: enrichedPlaces,
        } as Event;

        return enrichedEvent;
      }),
      catchError((error) => {
        this.#appStore.setError(error.message);
        return of({} as Event);
      }),
      finalize(() => this.#appStore.setLoading(false)),
    );
  }
}
