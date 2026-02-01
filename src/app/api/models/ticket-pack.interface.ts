// https://api.dev.2ticket.pt/ticketpacks/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba
import { TicketPackEventPlace } from './ticket-pack-event-place.interface';
import { TicketType } from './ticket-type.interface';

export interface TicketPack {
  id: number;
  name: string;
  slug: string;
  videoFrame: string | null;
  listThumbnail?: string;
  detailsThumbnail?: string;
  description: string;
  notes: string;
  ticketPackTemplateId: number | null;
  ticketTypeId: number;
  ticketType: TicketType;
  taxId: number;
  partialTaxId: number | null;
  partialTaxApplyPercentage: number | null;
  price: number;
  uses: number;
  events: TicketPackEventPlace[];
  active: boolean;
}
