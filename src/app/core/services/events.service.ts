import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, take, tap } from 'rxjs';

import { EventsDataService } from '../../api/services/events.data.service';
import { AppStore } from '../store/app-store';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  #appStore = inject(AppStore);
  #eventDataService: EventsDataService = inject(EventsDataService);

  public resolveData(): Observable<boolean> {
    if (!this.#appStore.hasEvents()) {
      return this.#eventDataService.getAll().pipe(
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
