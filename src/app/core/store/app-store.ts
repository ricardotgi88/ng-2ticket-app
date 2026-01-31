import { Injectable, signal, WritableSignal } from '@angular/core';
import { computed } from '@angular/core';

import { Event } from '../data/models/event.interface';
import { TicketType } from '../data/models/ticket-type.interface';
import { Cart } from '../interfaces/cart.interface';
import { Ticket } from '../interfaces/cart-ticket.interface';

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
  cart: { total: 0, tickets: [] },
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

  enrichEvent(event: Event): void {
    const events = this.appData().events.map((e) => (e.id === event.id ? event : e));

    const selectedEvent =
      this.appData().selectedEvent?.id === event.id ? event : this.appData().selectedEvent;

    this.appData.update((currentData) => ({ ...currentData, events, selectedEvent }));
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

  addTicketToCart(ticket: Ticket): void {
    const currentCart = this.appData().cart;
    let updatedTickets = currentCart.tickets;
    const existingTicket = updatedTickets.find(
      (t: Ticket) => t.event.id === ticket.event.id && t.type.id === ticket.type.id,
    );

    if (existingTicket) {
      updatedTickets = updatedTickets.map((t: Ticket) =>
        t.event.id === ticket.event.id && t.type.id === ticket.type.id
          ? { ...t, amount: (t.amount ?? 1) + 1 }
          : t,
      );
    } else {
      updatedTickets = [...updatedTickets, ticket];
    }

    const updatedTotal = updatedTickets.reduce(
      (sum, t) => sum + (t.price ?? 0) * (t.amount ?? 1),
      0,
    );

    this.appData.set({
      ...this.appData(),
      cart: { tickets: updatedTickets, total: updatedTotal },
    });
  }

  removeTicketFromCart(eventId: number, ticketTypeId: number): void {
    const currentCart = this.appData().cart;

    const updatedTickets = currentCart.tickets
      .map((t: Ticket) => {
        if (t.event.id === eventId && t.type.id === ticketTypeId) {
          if ((t.amount ?? 1) > 1) {
            return { ...t, amount: (t.amount ?? 1) - 1 };
          }

          return undefined;
        }
        return t;
      })
      .filter((t: Ticket | undefined) => t !== undefined);

    const updatedTotal = updatedTickets.reduce(
      (sum, t) => sum + (t.price || 0) * (t.amount || 1),
      0,
    );

    this.appData.set({
      ...this.appData(),
      cart: { tickets: updatedTickets, total: updatedTotal },
    });
  }
}
