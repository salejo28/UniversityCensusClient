import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { DataLoginUI, DataRgisterUI } from 'types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private endpoint: string = environment.endpointServer;
  private options = {
    headers: {
      authorization: environment.apiToken,
      'Content-Type': 'application/json',
      responseType: 'json',
    },
    withCredentials: true,
  };
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  set setLoggedIn(isLogged: boolean) {
    this.loggedIn.next(isLogged);
  }

  getTypesIdentification() {
    return this.http.get(`${this.endpoint}/typeIds/`, this.options);
  }

  login(data: DataLoginUI) {
    return this.http.post(`${this.endpoint}/auth/login`, data, this.options);
  }

  refrehToken() {
    return this.http.post(
      `${this.endpoint}/auth/refresh-token`,
      {},
      this.options
    );
  }

  register(data: DataRgisterUI) {
    return this.http.post(`${this.endpoint}/auth/register`, data, this.options);
  }

  logout() {
    return this.http.post(`${this.endpoint}/auth/logout`, {}, this.options);
  }
}
