import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../data/models/event.interface';
import { AppStore } from '../store/app-store';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  readonly #appStore = inject(AppStore);
  readonly #router = inject(Router);

  goToEvents() {
    this.#appStore.clearSelectedEvent();
    this.#router.navigate(['/events']);
  }

  goToEventDetails(event: Event) {
    this.#appStore.selectEvent(event);
    this.#router.navigate(['/events', event.id]);
  }

  goToCheckout() {
    this.#router.navigate(['/checkout']);
  }
}
