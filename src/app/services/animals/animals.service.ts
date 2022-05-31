import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
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

  getAnimals() {
    return this.http.get(`${this.endpoint}/animal/`, this.options);
  }

  getAnimal(id: string) {
    return this.http.get(`${this.endpoint}/animal/${id}`, this.options);
  }

  myAnimals(owner: string) {
    return this.http.get(`${this.endpoint}/animal/${owner}/`, this.options);
  }

  createAnimal(data: any) {
    return this.http.post(`${this.endpoint}/animal/`, data, this.options);
  }

  updateAnimal(data: any, id: string | number) {
    return this.http.put(`${this.endpoint}/animal/${id}`, data, this.options);
  }
}
