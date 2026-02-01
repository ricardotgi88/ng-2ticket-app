import { computed, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../../api/models/event.interface';
import { AppStore } from '../store/app-store';
import { AppPages } from '../enums/app-pages.enum';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  readonly #appStore = inject(AppStore);
  readonly #router = inject(Router);

  currentPage = computed(() => {
    const lastNavigation = this.#router.lastSuccessfulNavigation()?.extractedUrl;

    return this.#resolveCurrentPage(this.#router.url);
  });

  goToEvents() {
    this.#appStore.clearSelectedEvent();
    this.#router.navigate(['/events']);
  }

  goToEventDetails(event?: Event) {
    const eventFromParam = event;
    const eventFromStore = this.#appStore.selectedEvent();

    const eventToNavigate = eventFromParam ?? eventFromStore;

    if (!eventToNavigate) {
      this.goToEvents();
      return;
    }

    if (eventFromParam) {
      this.#appStore.selectEvent(eventFromParam);
    }

    this.#router.navigate(['/events', eventToNavigate.id]);
  }

  goToCheckout() {
    this.#router.navigate(['/checkout']);
  }

  goToPreviousPage(): void {
    const currentPage = this.#resolveCurrentPage(this.#router.url);

    switch (currentPage) {
      case AppPages.Details:
        this.goToEvents();

        break;
      case AppPages.Checkout:
        this.goToEventDetails();
        break;

      default:
        this.goToEvents();

        break;
    }
  }

  #resolveCurrentPage(currentUrl: string): AppPages {
    if (currentUrl.endsWith('events')) {
      return AppPages.Events;
    }

    if (currentUrl.endsWith('checkout')) {
      return AppPages.Checkout;
    }

    return AppPages.Details;
  }
}
