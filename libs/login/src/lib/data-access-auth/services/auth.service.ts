import {delay, map, Observable, of, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {LoginRequest} from "../models/login-request.model";
import {LoginResponse} from "../models/login-response.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const { username, password } = loginRequest;

    // Simulated user data
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

    // Simulated delay
    const simulatedDelay = 1000;

    return of(loginRequest).pipe(
        delay(simulatedDelay), // Simulate server delay
        map((request) => {
          // Check if username and password match any mock user
          const user = mockUsers.find(
              (u) => u.username === request.username && u.password === request.password
          );

          if (user) {
            const loginResponse: any = {
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
        })
    );
  }
}
