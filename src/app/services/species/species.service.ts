import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
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

  getAllSpecies() {
    return this.http.get(`${this.endpoint}/specie/`, this.options);
  }

  getSpecie(id: string) {
    return this.http.get(`${this.endpoint}/specie/${id}/`, this.options);
  }

  createSpecie(data: any) {
    return this.http.post(`${this.endpoint}/specie/`, data, this.options);
  }

  updateSpecie(data: any, id: string) {
    return this.http.put(`${this.endpoint}/specie/${id}`, data, this.options);
  }
}
