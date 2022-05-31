import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
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

  createLocation(data: any) {
    return this.http.post(`${this.endpoint}/location`, data, this.options);
  }

  getLocation() {
    return this.http.get(`${this.endpoint}/location`, this.options);
  }

  getByCient(client: string) {
    return this.http.get(`${this.endpoint}/location/${client}`, this.options);
  }

  updateLocation(id: string, data: any) {
    return this.http.put(`${this.endpoint}/location/${id}`, data, this.options);
  }
}
