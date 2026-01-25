import { Injectable, signal, WritableSignal } from '@angular/core';
import { computed } from '@angular/core';

import { Cart } from '../interfaces/cart.interface';
import { Event } from '../interfaces/event.interface';
import { Ticket } from '../interfaces/ticket.interface';
import { cartEquality, eventEquality, eventsEquality } from '../utils/equality.fn';

export interface AppData {
  events: Event[];
  selectedEvent: Event | null;
  cart: Cart;
}

export interface AppState {
  isLoading: boolean;
  error: string | null;
  language: 'en' | 'es' | 'pt';
  isDarkMode: boolean;
}

const initialAppData: AppData = {
  events: [],
  selectedEvent: null,
  cart: { total: 0, tickets: [] },
};

const initialAppState: AppState = {
  isLoading: false,
  error: null,
  language: 'en',
  isDarkMode: false,
};

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  public appData: WritableSignal<AppData> = signal(initialAppData);

  public appState: WritableSignal<AppState> = signal(initialAppState);

  selectedEvent = computed(() => this.appData().selectedEvent, { equal: eventEquality });
  events = computed(() => this.appData().events, { equal: eventsEquality });
  cart = computed(() => this.appData().cart, { equal: cartEquality });

  eventCount = computed(() => this.appData().events.length);
  hasEvents = computed(() => this.appData().events.length > 0);
  cartTotal = computed(() => this.appData().cart.total);
  cartItemCount = computed(() => this.appData().cart.tickets.length);

  // Data Mutations

  setEvents(events: Event[]): void {
    this.appData.set({ ...this.appData(), events });
  }

  selectEvent(event: Event): void {
    this.appData.set({ ...this.appData(), selectedEvent: event });
  }

  clearSelectedEvent(): void {
    this.appData.set({ ...this.appData(), selectedEvent: null });
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

  setLanguage(language: 'en' | 'es' | 'pt'): void {
    this.appState.set({ ...this.appState(), language });
  }

  toggleDarkMode(): void {
    this.appState.update((state) => ({ ...state, isDarkMode: !state.isDarkMode }));
  }

  setDarkMode(isDarkMode: boolean): void {
    this.appState.set({ ...this.appState(), isDarkMode });
  }
}
