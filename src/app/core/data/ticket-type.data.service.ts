import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TicketType } from './models/ticket-type.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketTypeDataService {
  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl =
    'https://api.dev.2ticket.pt/tickets/types/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba';

  getAllTicketTypes(): Observable<TicketType[]> {
    const url = `${this.apiUrl}`;

    return this.http.get<TicketType[]>(url);
  }
}
