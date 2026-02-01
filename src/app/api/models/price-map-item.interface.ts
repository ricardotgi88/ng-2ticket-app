import { TicketType } from './ticket-type.interface';

export interface PriceMapItem {
  id: number;
  zoneId: number | null;
  grandstandId: number | null;
  sectionId: number | null;
  benchRowId: number | null;
  benchId: number | null;
  ticketTypeId: number;
  ticketType: TicketType;
  price: number;
  bundleOnly: boolean;
  rules: unknown[]; // não há estrutura definida no payload
  bundles: unknown[]; // idem
}
