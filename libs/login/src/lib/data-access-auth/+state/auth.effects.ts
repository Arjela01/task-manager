import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.loginRequest).pipe(
          map((loginResponse) => {
            if (loginResponse.isSuccessful) {
              return AuthActions.loginSuccess({ loginResponse });
            } else {
              return AuthActions.loginFailure({
                error: new Error(
                  loginResponse.errorMessage ?? 'Invalid username or password.'
                ),
              });
            }
          }),
          catchError((error) => {
            return of(
              AuthActions.loginFailure({
                error: new Error('Something went wrong. Please try again!'),
              })
            );
          })
        )
      )
    )
  );

  passwordChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.passwordChange),
        tap(() => {
          this.router.navigate(['/reset-password']);
        })
      ),
    { dispatch: false }
  );
}
