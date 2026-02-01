import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService<Model> {
  private http: HttpClient = inject(HttpClient);

  private baseUrl = 'https://api.dev.2ticket.pt';
  protected apiUrl = '';

  public getAll(): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.baseUrl}${this.apiUrl}`);
  }

  public getById(id: number): Observable<Model> {
    const url = `${this.baseUrl}${this.apiUrl}/id/${id}`;

    return this.http.get<Model>(url);
  }
}
