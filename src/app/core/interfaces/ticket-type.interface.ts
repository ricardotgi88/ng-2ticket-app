export interface TicketType {
  id: number;
  ticketTypeId: number;
  datetime: string;
  ticketLimit: number;
  dependingTicketTypeId: number | null;
}
