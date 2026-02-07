import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { EventsDetailsService } from '../services/events-details.service';

@Injectable({ providedIn: 'root' })
export class EventDetailsPreloadResolver implements Resolve<boolean> {
  #router: Router = inject(Router);
  #titleService: Title = inject(Title);
  #eventsDetailsService: EventsDetailsService = inject(EventsDetailsService);

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.#eventsDetailsService.resolveData(route.params['id']).pipe(
      map((event) => {
        if (!event) {
          this.#router.navigate(['/error']);
        }

        this.#titleService.setTitle(`2Ticket - ${event?.name ?? 'Event Details'}`);

        return !!event;
      }),
    );
  }
}
