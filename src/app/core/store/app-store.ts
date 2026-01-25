import { Injectable, signal, WritableSignal } from '@angular/core';
import { computed } from '@angular/core';

import { Cart } from '../interfaces/cart.interface';
import { Event } from '../interfaces/event.interface';
import { Ticket } from '../interfaces/ticket.interface';

export interface AppState {
  events: Event[];
  selectedEvent: Event | null;
  cart: Cart;
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  events: [],
  selectedEvent: null,
  cart: { total: 0, tickets: [] },
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

  addTicketToCart(ticket: Ticket): void {
    const currentCart = this.appStore().cart;
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

    this.appStore.set({
      ...this.appStore(),
      cart: { tickets: updatedTickets, total: updatedTotal },
    });
  }

  removeTicketFromCart(eventId: number, ticketTypeId: number): void {
    const currentCart = this.appStore().cart;

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

    this.appStore.set({
      ...this.appStore(),
      cart: { tickets: updatedTickets, total: updatedTotal },
    });
  }
}
