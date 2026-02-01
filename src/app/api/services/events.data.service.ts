import { Injectable } from '@angular/core';

import { Event } from '../models/event.interface';
import { BaseDataService } from './base.data.service';

@Injectable({
  providedIn: 'root',
})
export class EventsDataService extends BaseDataService<Event> {
  override apiUrl = '/events/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba/list/public';
}
