import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { UserUI } from 'types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint: string = environment.endpointServer;
  private options = {
    headers: {
      authorization: environment.apiToken,
      'Content-Type': 'application/json',
      responseType: 'json',
    },
    withCredentials: true,
  };
  public user = new BehaviorSubject<UserUI | null>(null);

  constructor(private http: HttpClient) {}

  get getUser() {
    return this.user.asObservable();
  }

  set setUser(user: UserUI) {
    this.user.next(user);
  }

  profile() {
    return this.http.get(`${this.endpoint}/user/profile/`, this.options);
  }

  updateUser(data: any, id: number) {
    return this.http.put(`${this.endpoint}/user/${id}`, data, this.options);
  }

  uploadImage() {}

  getAllOfficials() {
    return this.http.get(`${this.endpoint}/user/officials/`, this.options);
  }
}
