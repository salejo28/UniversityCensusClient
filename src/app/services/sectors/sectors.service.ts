import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
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

  getSectors() {
    return this.http.get(`${this.endpoint}/sector/`, this.options);
  }

  getSector(id: string) {
    return this.http.get(`${this.endpoint}/sector/${id}`, this.options);
  }

  createSector(data: any) {
    return this.http.post(`${this.endpoint}/sector/`, data, this.options);
  }

  assignSector(data: any) {
    return this.http.post(
      `${this.endpoint}/sector/assign/`,
      data,
      this.options
    );
  }

  unAssignSector(id: string) {
    return this.http.post(`${this.endpoint}/sector/${id}`, {}, this.options);
  }

  updateSector(data: any, id: string) {
    return this.http.put(`${this.endpoint}/sector/${id}`, data, this.options);
  }
}
