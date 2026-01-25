import { Ticket } from './ticket.interface';

export interface Cart {
  total: number;
  tickets: Ticket[];
}
