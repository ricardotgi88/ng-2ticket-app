import { Injectable } from '@angular/core';

import { TicketType } from '../models/ticket-type.interface';
import { BaseDataService } from './base.data.service';

@Injectable({
  providedIn: 'root',
})
export class TicketTypeDataService extends BaseDataService<TicketType> {
  override apiUrl = '/tickets/types/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba';
}
