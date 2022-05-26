import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  private endpoint: string = environment.endpointServer;
  private options = {
    headers: {
      authorization: environment.apiToken,
      'Content-Type': 'application/json',
      responseType: 'json',
    },
    withCredentials: true,
  };
  constructor(private http: HttpClient) {}

  getAllRaces() {
    return this.http.get(`${this.endpoint}/race/`, this.options);
  }

  getRace(id: string) {
    return this.http.get(`${this.endpoint}/race/${id}/`, this.options);
  }

  createRace(data: any) {
    return this.http.post(`${this.endpoint}/race/`, data, this.options);
  }

  updateRace(id: string, data: any) {
    return this.http.put(`${this.endpoint}/race/${id}/`, data, this.options);
  }
}
