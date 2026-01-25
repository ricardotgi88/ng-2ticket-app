import { Event } from './event.interface';
import { TicketType } from './ticket-type.interface';

export interface Ticket {
  type: TicketType;
  amount: number;
  price: number;
  event: Event;
}
