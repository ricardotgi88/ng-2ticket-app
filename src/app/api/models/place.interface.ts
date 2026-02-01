import { PriceMap } from './price-map.interface';
import { TicketPack } from './ticket-pack.interface';

export interface Place {
  id: number;
  placeId: number;
  placeName: string;
  priceMap: PriceMap;
  ticketPacks: TicketPack[] | null;
  priceMapId: number;
  availabilityMapId: number;
  timezone: string;
}
