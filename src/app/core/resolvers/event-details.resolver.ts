import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { EventsDataService } from '../data/events.data.service';
import { AppStore } from '../store/app-store';

@Injectable({ providedIn: 'root' })
export class EventDetailsPreloadResolver implements Resolve<boolean> {
  private router: Router = inject(Router);
  private eventService: EventsDataService = inject(EventsDataService);
  private appStore: AppStore = inject(AppStore);

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (!this.appStore.appStore().selectedEvent) {
      return this.eventService.getEventById(route.params['id']).pipe(
        tap((event) => this.appStore.selectEvent(event)),
        map(() => true),
        catchError(() => {
          this.router.navigate(['/erro']);
          return of(false);
        }),
      );
    }

    return of(true);
  }
}
