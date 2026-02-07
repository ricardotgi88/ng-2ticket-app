import { Component, inject } from '@angular/core';

import { Event } from '../../api/models/event.interface';
import { RouteService } from '../../core/services/route.service';
import { AppStore } from '../../core/store/app-store';
import { EventCard } from '../../shared/components/event-card/event-card';
import { EventsService } from '../../core/services/events.service';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  readonly #routeService = inject(RouteService);
  readonly #eventsService = inject(EventsService);

  public events = this.#eventsService.events;

  onEventSelected(event: Event) {
    this.#routeService.goToEventDetails(event);
  }
}
