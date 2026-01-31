import { Event } from '../data/models/event.interface';
import { EventTicketType } from '../data/models/event-ticket-type.interface';

export interface Ticket {
  type: EventTicketType;
  amount: number;
  price: number;
  event: Event;
}
