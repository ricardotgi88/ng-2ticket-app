import { inject, Injectable } from '@angular/core';
import { TicketTypeEnum } from '../enums/ticket-type.enum';
import { AppStore } from '../store/app-store';
import { OperationTypeEnum } from '../enums/operation-type.enum';
import { CartTicket } from '../interfaces/cart-ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  #store = inject(AppStore);

  updateCart(ticket: Partial<CartTicket>): void {
    const event = this.#store.selectedEvent();
    if (!event) {
      return;
    }

    const newTicket = {
      ...ticket,
      eventId: event.id,
    } as CartTicket;

    const currentCart = this.#store.cart();

    let currentTickets = currentCart.tickets;
    let ticketIdx: number;

    if (newTicket.ticketType === TicketTypeEnum.ticketPack) {
      ticketIdx = currentTickets.findIndex(
        (ticket) =>
          ticket.eventId === newTicket.eventId && ticket.ticketPackId === newTicket.ticketPackId,
      );
    } else {
      ticketIdx = currentTickets.findIndex(
        (ticket: CartTicket) =>
          ticket.eventId === newTicket.eventId &&
          ticket.priceMapId === newTicket.priceMapId &&
          ticket.priceMapItemId === newTicket.priceMapItemId,
      );
    }

    if (ticketIdx !== -1) {
      if (newTicket.amount > 0) {
        currentTickets[ticketIdx] = {
          ...currentTickets[ticketIdx],
          ...newTicket,
        };
      } else {
        currentTickets.splice(ticketIdx, 1);
      }
    } else {
      currentTickets = [...currentTickets, newTicket];
    }

    const updatedTotal = currentTickets.reduce(
      (sum, t) => sum + (t.price ?? 0) * (t.amount ?? 1),
      0,
    );

    const updatedTicketAmount = currentTickets.reduce((sum, t) => sum + (t.amount ?? 1), 0);

    this.#store.updateCart({
      tickets: currentTickets,
      totalPrice: updatedTotal,
      totalTickets: updatedTicketAmount,
    });
  }
}
