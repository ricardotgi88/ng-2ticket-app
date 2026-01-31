import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PriceMap } from './models/price-maps.interface';

@Injectable({
  providedIn: 'root',
})
export class PriceMapDataService {
  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl =
    'https://api.dev.2ticket.pt/pricemaps/apikey/d1b53c7d-22c4-4b75-92dd-c8966317fbba';

  getPriceMapById(id: number): Observable<PriceMap> {
    const url = `${this.apiUrl}/id/${id}`;

    return this.http.get<PriceMap>(url);
  }
}
