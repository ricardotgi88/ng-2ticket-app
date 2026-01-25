import { inject, Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { EventsDataService } from '../data/events.data.service';
import { AppStore } from '../store/app-store';

@Injectable({ providedIn: 'root' })
export class EventsPreloadResolver implements Resolve<boolean> {
  private router: Router = inject(Router);
  private eventService: EventsDataService = inject(EventsDataService);
  private appStore: AppStore = inject(AppStore);

  resolve(): Observable<boolean> {
    if (!this.appStore.hasEvents()) {
      return this.eventService.getEvents().pipe(
        tap((events) => this.appStore.setEvents(events)),
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
