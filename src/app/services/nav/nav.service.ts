import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public isShowSideNav = new BehaviorSubject<boolean>(false);
  constructor() {}

  get showSideNav() {
    return this.isShowSideNav.asObservable();
  }

  set setShowSideNav(show: boolean) {
    this.isShowSideNav.next(show);
  }
}
