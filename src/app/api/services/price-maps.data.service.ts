import { Injectable } from '@angular/core';

import { PriceMap } from '../models/price-map.interface';
import { BaseDataService } from './base.data.service';

@Injectable({
  providedIn: 'root',
})
export class PriceMapDataService extends BaseDataService<PriceMap> {
  override apiUrl = '/pricemaps/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba';
}
