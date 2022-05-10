import { Component } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { NavService } from 'services/nav/nav.service';
import { RoutesUI, UserUI } from 'types';
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
  currentRoute: string | undefined;
  routes: RoutesUI[] = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: 'home',
    },
    {
      name: 'Usuarios',
      path: '/users',
      icon: 'people',
    },
    {
      name: 'Especies',
      path: '/species',
      icon: 'pets',
    },
    {
      name: 'Razas',
      path: '/races',
      icon: 'pets',
    },
    {
      name: 'Sectores',
      path: '/sectors',
      icon: 'place',
    },
  ];
  constructor(
    private authService: AuthService,
    private navService: NavService,
    private userService: UserService,
    private router: Router
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

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

  handleNavigate(route: string) {
    this.navService.setShowSideNav = false;
    this.router.navigate([`${route}`]);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('signin');
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }

  backdropClick() {
    this.navService.setShowSideNav = false;
  }
}
