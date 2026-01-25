import { Component, inject } from '@angular/core';

import { AppStore } from '../../core/store/app-store';

@Component({
  selector: 'app-event-list',
  imports: [],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  readonly #appStore = inject(AppStore);

  public events = this.#appStore.events;
}
