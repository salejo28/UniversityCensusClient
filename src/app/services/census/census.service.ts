import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CensusService {
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

  makeCensus(data: any) {
    return this.http.post(`${this.endpoint}/census/`, data, this.options);
  }

  report(data: any) {
    return this.http.post(`${this.endpoint}/census/report`, data, this.options);
  }

  getAll() {
    return this.http.get(`${this.endpoint}/census`, this.options);
  }

  updateCensus(data: any, id: string) {
    return this.http.put(`${this.endpoint}/census/${id}`, data, this.options);
  }
}
