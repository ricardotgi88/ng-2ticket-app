import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Event } from './models/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsDataService {
  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl =
    'https://api.dev.2ticket.pt/events/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba/list/public';

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}`);
  }

  getEventById(id: string): Observable<Event> {
    const url = `${this.apiUrl}/id/${id}`;

    return this.http.get<Event>(url);
  }
}
