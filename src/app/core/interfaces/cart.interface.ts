import { CartTicket } from './cart-ticket.interface';

export interface Cart {
  totalPrice: number;
  totalTickets: number;
  tickets: CartTicket[];
}
