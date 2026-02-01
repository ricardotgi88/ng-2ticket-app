// https://api.dev.2ticket.pt/pricemaps/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba/id/id:1347
import { PriceMapItem } from './price-map-item.interface';

export interface PriceMap {
  id: number;
  name: string;
  placeId: number;
  template: boolean;
  baseMapId: number | null;
  taxId: number;
  active: boolean;
  mapping: PriceMapItem[];
}
