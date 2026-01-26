import { Component, inject } from '@angular/core';

import { AppStore } from '../../core/store/app-store';
import { EventInfoCard } from '../../shared/components/event-info-card/event-info-card';

@Component({
  selector: 'app-event-list',
  imports: [EventInfoCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  readonly #appStore = inject(AppStore);

  public events = this.#appStore.events;
}
