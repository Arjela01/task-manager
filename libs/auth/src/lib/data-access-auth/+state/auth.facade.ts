import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { LoginRequest } from '../models/login-request.model';
import { authQuery } from './auth.selectors';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  error$ = this.store.select(authQuery.selectError);
  isAuthenticated$ = this.store.select(authQuery.selectIsAuthenticated);
  user$ = this.store.select(authQuery.selectUser);
  token$ = this.store.select(authQuery.selectToken);

  constructor(private authService: AuthService) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.authService.getAuthToken();
    const user = this.authService.getUser();

    if (token && user) {
      this.store.dispatch(AuthActions.authInitSuccess({ token, user }));
    } else {
      this.store.dispatch(AuthActions.logout());
    }
  }

  login(loginRequest: LoginRequest) {
    this.store.dispatch(AuthActions.login({ loginRequest }));
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(AuthActions.logout());
  }
}
