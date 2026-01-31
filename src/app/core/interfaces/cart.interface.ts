import { Ticket } from './cart-ticket.interface';

export interface Cart {
  total: number;
  tickets: Ticket[];
}
