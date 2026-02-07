import { Event } from '../../api/models/event.interface';
import { TicketTypeEnum } from '../enums/ticket-type.enum';

export interface CartTicket {
  id: number;
  name: string;
  ticketType: TicketTypeEnum;
  amount: number;
  price: number;
  total: number;
}

export interface CartTax {
  name: string;
  value: number;
}

export interface CartEvent {
  event: Event;
  tickets: CartTicket[];
}

export interface Cart {
  events: CartEvent[];
  servicesFee: number;
  taxes: CartTax[];
  totalPrice: number;
  totalTickets: number;
}
