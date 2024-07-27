import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  login(loginRequest: LoginRequest): Observable<any> {

    const mockUsers = [
      {
        username: 'admin@example.com',
        password: 'admin123',
        token: 'admin-token-12345',
        displayName: 'Admin User',
        role: 'admin',
        isSuccessful: true,
      },
      {
        username: 'employee@example.com',
        password: 'employee123',
        token: 'employee-token-12345',
        displayName: 'Employee User',
        role: 'employee',
        isSuccessful: true,
      }
    ];

    const simulatedDelay = 1000;

    return of(loginRequest).pipe(
        delay(simulatedDelay),
        map((request) => {
          const user = mockUsers.find(
              (u) => u.username === request.username && u.password === request.password
          );

          if (user) {
            const loginResponse: LoginResponse = {
              displayName: user.displayName,
              token: user.token,
              username: user.username,
              isSuccessful: user.isSuccessful,
              errorMessage: '',
              user: {
                id: mockUsers.indexOf(user) + 1,
                name: user.displayName,
                email: user.username,
                role: user.role,
              },
            };
            return loginResponse;
          } else {
            return throwError(() => new Error('Invalid username or password'));
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message));
        })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
