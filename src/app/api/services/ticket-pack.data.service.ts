import { Injectable } from '@angular/core';

import { TicketPack } from '../models/ticket-pack.interface';
import { BaseDataService } from './base.data.service';

@Injectable({
  providedIn: 'root',
})
export class TicketPackDataService extends BaseDataService<TicketPack> {
  override apiUrl = '/ticketpacks/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba';
}
