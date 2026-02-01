import { TicketTypeEnum } from '../enums/ticket-type.enum';

export interface CartTicket {
  eventId: number;
  priceMapId: number | null | undefined;
  priceMapItemId: number | null | undefined;
  ticketPackId: number | null | undefined;
  ticketType: TicketTypeEnum;
  amount: number;
  price: number;
  total: number;
}
