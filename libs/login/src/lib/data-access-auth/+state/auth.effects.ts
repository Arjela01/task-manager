import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService) {}

    login$ = createEffect(():any=>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({ loginRequest }) =>
                this.authService.login(loginRequest).pipe(
                    map((loginResponse) =>
                        AuthActions.loginSuccess({ loginResponse })
                    ),
                    catchError((error) =>
                        of(AuthActions.loginFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    initAuth$ = createEffect(():any =>
        this.actions$.pipe(
            ofType(AuthActions.initAuth),
            switchMap(() => {
                const token = localStorage.getItem('authToken');
                const user = JSON.parse(localStorage.getItem('authUser') || '{}');
                if (token && user) {
                    return of(AuthActions.authInitSuccess({ token, user }));
                } else {
                    return of(AuthActions.logout());
                }
            })
        )
    );
}
