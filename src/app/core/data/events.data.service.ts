import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsDataService {
  private readonly apiUrl =
    'https://api.dev.2ticket.pt/events/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba/list/public';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    const a = this.http.get<Event[]>(this.apiUrl);
    return a;
  }
}
