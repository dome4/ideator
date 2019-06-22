import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { LogIn, AuthActionTypes, LogInSuccess, LogInFailure } from '../actions/auth.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  // login effect
  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password)
          .pipe(
            map((user) => {
              console.log(user);
              return new LogInSuccess({ token: user.token, email: payload.email });
            }),
            catchError((error) => {
              console.log(error);
              return of(new LogInFailure({ error: error }));
            })
          )

      })
    );

  // login success effect
  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  // login failure effect
  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );







}
