import { inject, Injectable, untracked } from '@angular/core';
import { catchError, finalize, forkJoin, Observable, of } from 'rxjs';

import { Event } from '../../api/models/event.interface';
import { PriceMap } from '../../api/models/price-map.interface';
import { PriceMapDataService } from '../../api/services/price-maps.data.service';
import { AppStore } from '../store/app-store';

@Injectable({
  providedIn: 'root',
})
export class PriceMapService {
  #appStore = inject(AppStore);
  #priceMapDataService = inject(PriceMapDataService);

  public loadPriceMapsByEvent(selectedEvent: Event): Observable<PriceMap[]> {
    if (!selectedEvent.places?.length) {
      return of([]);
    }

    const priceMapsRequests$ = selectedEvent.places?.map((place) =>
      this.#priceMapDataService.getById(place.priceMapId),
    );

    untracked(() => this.#appStore.setLoading(true));

    return forkJoin(priceMapsRequests$).pipe(
      catchError((error) => {
        this.#appStore.setError(error.message);
        return of([]);
      }),
      finalize(() => untracked(() => this.#appStore.setLoading(false))),
    );
  }
}
