import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { AppStore } from '../../core/store/app-store';

@Component({
  selector: 'app-event-details',
  imports: [JsonPipe],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  readonly #appStore = inject(AppStore);

  public selectedEvent = this.#appStore.appStore().selectedEvent;
}
