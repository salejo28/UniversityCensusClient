import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '@app/services/user/user.service';
import { Observable } from 'rxjs';
import { UserUI } from 'types';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: UserUI | undefined;

  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService.getUser.subscribe(
      (value) => (this.user = value as UserUI)
    );
    const signin = localStorage.getItem('signin');

    if (signin === 'true') {
      if (this.user) {
        if (
          route.data['roles'] &&
          route.data['roles'].indexOf(this.user?.role ?? '') === -1
        ) {
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
