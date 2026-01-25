import { Injectable, signal, WritableSignal } from '@angular/core';
import { computed } from '@angular/core';
import { Event } from '../interfaces/event.interface';

export interface AppState {
  events: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  public appStore: WritableSignal<AppState> = signal(initialState);

  eventCount = computed(() => this.appStore().events.length);
  hasEvents = computed(() => this.appStore().events.length > 0);

  setEvents(events: Event[]): void {
    this.appStore.set({ ...this.appStore(), events });
  }

  selectEvent(event: Event): void {
    this.appStore.set({ ...this.appStore(), selectedEvent: event });
  }

  clearSelectedEvent(): void {
    this.appStore.set({ ...this.appStore(), selectedEvent: null });
  }

  setLoading(loading: boolean): void {
    this.appStore.set({ ...this.appStore(), loading });
  }

  setError(error: string | null): void {
    this.appStore.set({ ...this.appStore(), error });
  }

  clearError(): void {
    this.appStore.set({ ...this.appStore(), error: null });
  }
}
