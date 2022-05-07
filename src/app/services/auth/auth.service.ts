import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { DataLoginUI } from 'types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private endpoint: string = environment.endpointServer;
  private options = {
    headers: {
      authorization: environment.apiToken,
    },
  };

  getTypesIdentification() {
    return this.http.get(`${this.endpoint}/typeIds/`, this.options);
  }

  login(data: DataLoginUI) {
    return this.http.post(`${this.endpoint}/auth/login`, data);
  }
}
