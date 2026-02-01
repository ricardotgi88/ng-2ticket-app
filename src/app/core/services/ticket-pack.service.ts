import { inject, Injectable, untracked } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';

import { Event } from '../../api/models/event.interface';
import { TicketPack } from '../../api/models/ticket-pack.interface';
import { TicketPackDataService } from '../../api/services/ticket-pack.data.service';
import { AppStore } from '../store/app-store';

@Injectable({
  providedIn: 'root',
})
export class TicketPackService {
  #appStore = inject(AppStore);
  #ticketPackDataService = inject(TicketPackDataService);

  public loadTicketPackByEvent(selectedEvent: Event): Observable<TicketPack[]> {
    if (!selectedEvent.places?.length) {
      return of([]);
    }

    untracked(() => this.#appStore.setLoading(true));

    return this.#ticketPackDataService.getAll().pipe(
      catchError((error) => {
        this.#appStore.setError(error.message);
        return of([]);
      }),
      finalize(() => untracked(() => this.#appStore.setLoading(false))),
    );
  }
}
