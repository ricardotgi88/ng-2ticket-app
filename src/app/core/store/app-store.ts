import { Injectable, signal, WritableSignal } from '@angular/core';
import { computed } from '@angular/core';

import { Event } from '../../api/models/event.interface';
import { TicketType } from '../../api/models/ticket-type.interface';
import { Cart } from '../interfaces/cart.interface';

export enum Languages {
  EN = 'en',
  ES = 'es',
  PT = 'pt',
}

export interface AppData {
  events: Event[];
  selectedEvent: Event | null;
  ticketTypes: TicketType[];
  cart: Cart;
}

export interface AppState {
  isLoading: boolean;
  error: string | null;
  language: Languages;
}

const initialAppData: AppData = {
  events: [],
  selectedEvent: null,
  ticketTypes: [],
  cart: { events: [], taxes: [], totalPrice: 0, totalTickets: 0, servicesFee: 0 },
};

const initialAppState: AppState = {
  isLoading: false,
  error: null,
  language: Languages.EN,
};

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  public appData: WritableSignal<AppData> = signal(initialAppData);
  public appState: WritableSignal<AppState> = signal(initialAppState);

  isLoading = computed(() => this.appState().isLoading);

  selectedEvent = computed(() => this.appData().selectedEvent);
  ticketTypes = computed(() => this.appData().ticketTypes);
  hasEvents = computed(() => this.appData().events.length > 0);

  events = computed(() => this.appData().events);

  cart = computed(() => this.appData().cart);

  // Data Mutations

  setEvents(events: Event[]): void {
    this.appData.set({ ...this.appData(), events });
  }

  selectEvent(event: Event): void {
    this.appData.set({ ...this.appData(), selectedEvent: event });
  }

  setTicketTypes(ticketTypes: TicketType[]): void {
    this.appData.set({ ...this.appData(), ticketTypes });
  }

  enrichSelectedEvent(selectedEvent: Event): void {
    const events = this.appData().events.map((e) =>
      e.id === selectedEvent.id ? selectedEvent : e,
    );

    this.appData.update((currentData) => ({ ...currentData, events, selectedEvent }));
  }

  clearSelectedEvent(): void {
    this.appData.set({ ...this.appData(), selectedEvent: null });
  }

  updateCart(cart: Cart): void {
    this.appData.update((currentData) => ({ ...currentData, cart }));
  }

  // State Mutations

  setLoading(isLoading: boolean): void {
    this.appState.set({ ...this.appState(), isLoading });
  }

  setError(error: string | null): void {
    this.appState.set({ ...this.appState(), error });
  }

  clearError(): void {
    this.appState.set({ ...this.appState(), error: null });
  }

  setLanguage(language: Languages): void {
    this.appState.set({ ...this.appState(), language });
  }
}
