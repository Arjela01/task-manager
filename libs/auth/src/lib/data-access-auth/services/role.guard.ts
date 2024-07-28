import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthState } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select('auth').pipe(
      map((authState) => {
        if (authState.isAuthenticated) {
          if (authState.user.role === 'admin') {
            return true;
          } else {
            this.router.navigate(['/unauthorized']);
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
