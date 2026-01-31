import { TicketType } from './ticket-type.interface';

export interface EventTicketType {
  id: number;
  ticketTypeId: number;
  ticketType: TicketType;
  datetime: string;
  ticketLimit: number;
  dependingTicketTypeId: number | null;
}
