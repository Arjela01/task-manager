
import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { User } from '../models/user.model';
export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Init Auth': emptyProps(),
    'Load Auth Success': props<{
      token: string;
      user: User;
    }>(),
    Login: props<{ loginRequest: LoginRequest }>(),
    'Login Failure': props<{ error: Error }>(),
    'Login Success': props<{
      loginResponse: LoginResponse;
    }>(),
    passwordChange: emptyProps(),
    resetToken: emptyProps(),
    Logout: emptyProps(),
    Nothing: emptyProps(),
  },
});
