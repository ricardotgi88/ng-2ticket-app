import { Component, inject } from '@angular/core';

import { AppStore } from '../../core/store/app-store';
import { EventInfoCard } from '../../shared/components/event-info-card/event-info-card';
import { Event } from '../../core/interfaces/event.interface';
import { Router } from '@angular/router';
import { RouteService } from '../../core/services/route.service';

@Component({
  selector: 'app-event-list',
  imports: [EventInfoCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  readonly #routeService = inject(RouteService);
  readonly #appStore = inject(AppStore);

  public events = this.#appStore.events;

  onEventSelected(event: Event) {
    this.#routeService.goToEventDetails(event);
  }
}
