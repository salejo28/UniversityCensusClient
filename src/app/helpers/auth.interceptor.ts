import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { AuthService } from '@app/services/auth/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error.status === 401 && !req.url.includes('/login')) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    ) as any;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refrehToken().pipe(
      switchMap((resopnse) => {
        return next.handle(request);
      }),
      catchError((err) => {
        localStorage.removeItem('signin');
        this.authService.logout().subscribe({
          complete: () => this.router.navigate(['']),
        });

        return throwError(() => err);
      })
    );
  }
}

export const interceptortproviders = [
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
];
