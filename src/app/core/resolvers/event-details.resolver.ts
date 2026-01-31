import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { EventsDetailsService } from '../services/events-details.service';

@Injectable({ providedIn: 'root' })
export class EventDetailsPreloadResolver implements Resolve<boolean> {
  #router: Router = inject(Router);
  #eventsDetailsService: EventsDetailsService = inject(EventsDetailsService);

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.#eventsDetailsService.resolveData(route.params['id']).pipe(
      map((result) => {
        if (!result) {
          this.#router.navigate(['/error']);
        }

        return result;
      }),
    );
  }
}
