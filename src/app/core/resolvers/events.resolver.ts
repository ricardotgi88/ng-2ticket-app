import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Resolve, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { EventsService } from '../services/events.service';

@Injectable({ providedIn: 'root' })
export class EventsPreloadResolver implements Resolve<boolean> {
  #router: Router = inject(Router);
  #titleService: Title = inject(Title);
  #eventsService: EventsService = inject(EventsService);

  resolve(): Observable<boolean> {
    return this.#eventsService.resolveData().pipe(
      map((result) => {
        if (!result) {
          this.#router.navigate(['/error']);
        }

        this.#titleService.setTitle('2Ticket - Eventos');

        return result;
      }),
    );
  }
}
