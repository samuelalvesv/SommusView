import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DengueDataService {
  private baseUrl = '/AlertDengue';

  constructor(private http: HttpClient) { }

  getDengueData(semana: number, ano: number): Observable<any[]> {
    const url = `${this.baseUrl}/GetByWeek?ew=${semana}&ey=${ano}`;
    return this.http.get<any[]>(url);
  }
}
