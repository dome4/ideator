import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(AuthService);

    // get auth token of current user
    const token: string = this.authService.getToken();

    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError((response: any) => {
          if (response instanceof HttpErrorResponse && response.status === 401) {

            // remove the token from localStorage and redirect the user
            localStorage.removeItem('token');
            this.router.navigateByUrl('/login');
          }

          // ToDo: handle case of unvalid token -> renew token
          return Observable.throw(response);
        })
      );
  }
}
