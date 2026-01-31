import { PriceMap } from './price-maps.interface';

export interface Place {
  id: number;
  placeId: number;
  placeName: string;
  priceMap: PriceMap;
  priceMapId: number;
  availabilityMapId: number;
  timezone: string;
}
