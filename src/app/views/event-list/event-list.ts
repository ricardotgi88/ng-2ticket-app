import { Component, inject } from '@angular/core';

import { Event } from '../../api/models/event.interface';
import { EventsService } from '../../core/services/events.service';
import { RouteService } from '../../core/services/route.service';
import { EventCard } from '../../shared/components/event-card/event-card';

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
