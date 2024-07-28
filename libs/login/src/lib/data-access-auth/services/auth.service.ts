import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { MockUsers } from '@task-manager/shared';
import {LoginRequest} from "../models/login-request.model";
import {LoginResponse} from "../models/login-response.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(loginRequest: LoginRequest): Observable<any> {
    const mockUsers: User[] | any = MockUsers;
    const simulatedDelay = 1000;

    return of(loginRequest).pipe(
        delay(simulatedDelay),
        map((request) => {
          const user = mockUsers.find(
              (u : LoginRequest) => u.username === request.username && u.password === request.password
          );

          if (user) {
            const loginResponse: LoginResponse = {
              ...user,
              displayName: user.displayName,
              token: user.token,
              username: user.username,
              isSuccessful: true,
              errorMessage: '',
              assignedTo: user.assignedTo,
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
          const errorResponse: LoginResponse = {
            ...error,
            errorMessage: error.message,
          };
          return of(errorResponse);
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

  getUser(): User {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
