import { Component, inject } from '@angular/core';
import { AppStore } from '../../core/store/app-store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  imports: [JsonPipe],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  readonly #appStore = inject(AppStore);

  public events = this.#appStore.appStore().events;
}
