import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavService } from 'services/nav/nav.service';
import { UserUI } from 'types';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Animal Census';
  isLoggedIn: Observable<boolean> | undefined;
  showSideNav: Observable<boolean> | undefined;
  user: UserUI | undefined;
  routes = [];

  constructor(
    private authService: AuthService,
    private navService: NavService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.showSideNav = this.navService.isShowSideNav;
    if (localStorage.getItem('signin') === 'true') {
      this.authService.setLoggedIn = true;
      this.userService.profile().subscribe({
        next: (response: any) => {
          this.user = response;
          this.userService.setUser = response;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  backdropClick() {
    this.navService.setShowSideNav = false;
  }
}
