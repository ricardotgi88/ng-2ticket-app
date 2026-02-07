import { computed, inject, Injectable } from '@angular/core';

import { CartTicket } from '../interfaces/cart.interface';
import { AppStore } from '../store/app-store';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  #store = inject(AppStore);

  cart = this.#store.cart;

  selectedTicketsMap = computed(() => {
    const selectedTickets = this.getSelectedTickets();
    const newMap = new Map<string, number>();

    for (const ticket of selectedTickets) {
      const key = `${ticket.ticketType}-${ticket.id}`;
      newMap.set(key, ticket.amount ?? 0);
    }

    return newMap;
  });

  public updateCart(ticket: CartTicket): void {
    const selectedEvent = this.#store.selectedEvent();
    if (!selectedEvent) {
      return;
    }

    const currentCart = this.#store.cart();
    const updatedEvents = [...currentCart.events];
    const eventIdx = updatedEvents.findIndex((entry) => entry.event.id === selectedEvent.id);

    const existingTicket =
      eventIdx === -1
        ? undefined
        : updatedEvents[eventIdx].tickets.find(
            (t) => t.id === ticket.id && t.ticketType === ticket.ticketType,
          );

    const amount = Math.max(0, ticket.amount ?? 0);
    const price = ticket.price ?? existingTicket?.price ?? 0;
    const normalizedTicket: CartTicket = {
      ...ticket,
      name: ticket.name ?? existingTicket?.name ?? '',
      price,
      amount,
      total: price * amount,
    };

    if (eventIdx === -1 && amount > 0) {
      updatedEvents.push({ event: selectedEvent, tickets: [normalizedTicket] });
    } else if (eventIdx !== -1) {
      const eventEntry = updatedEvents[eventIdx];
      const updatedTickets = [...eventEntry.tickets];
      const ticketIdx = updatedTickets.findIndex(
        (t) => t.id === normalizedTicket.id && t.ticketType === normalizedTicket.ticketType,
      );

      if (ticketIdx !== -1) {
        if (amount > 0) {
          updatedTickets[ticketIdx] = { ...updatedTickets[ticketIdx], ...normalizedTicket };
        } else {
          updatedTickets.splice(ticketIdx, 1);
        }
      } else if (amount > 0) {
        updatedTickets.push(normalizedTicket);
      }

      if (updatedTickets.length === 0) {
        updatedEvents.splice(eventIdx, 1);
      } else {
        updatedEvents[eventIdx] = { ...eventEntry, tickets: updatedTickets };
      }
    }

    const updatedTotals = updatedEvents.reduce(
      (acc, entry) => {
        for (const t of entry.tickets) {
          acc.totalPrice += (t.price ?? 0) * (t.amount ?? 0);
          acc.totalTickets += t.amount ?? 0;
        }
        return acc;
      },
      { totalPrice: 0, totalTickets: 0 },
    );

    this.#store.updateCart({
      ...currentCart,
      events: updatedEvents,
      totalPrice: updatedTotals.totalPrice,
      totalTickets: updatedTotals.totalTickets,
    });
  }

  public getSelectedTickets(): CartTicket[] {
    return this.#store.cart().events.flatMap((entry) => entry.tickets);
  }
}
