import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.states';

@Injectable()
export class AuthGuardService implements CanActivate {

  getState: Observable<any>;
  isAuthenticated: false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);

    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    })

    // ToDo destroy subscription
    // ToDo find better implementation -> services should not subscribe to observables
  }

  /**
   * check if user is authenticated
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
