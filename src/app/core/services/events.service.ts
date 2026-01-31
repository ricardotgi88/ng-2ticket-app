import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, take, tap } from 'rxjs';

import { EventsDataService } from '../data/events.data.service';
import { AppStore } from '../store/app-store';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  #appStore = inject(AppStore);
  #eventDataService: EventsDataService = inject(EventsDataService);

  public resolveData(): Observable<boolean> {
    if (!this.#appStore.hasEvents()) {
      return this.#eventDataService.getEvents().pipe(
        tap((events) => this.#appStore.setEvents(events)),
        take(1),
        map(() => true),
        catchError(() => {
          return of(false);
        }),
      );
    }

    return of(true);
  }
}
