import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { GenericStoreStatus, User } from '../models/user.model';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  error: string | null;
  isAuthenticated: boolean;
  user: User;
  token: string;
  status: GenericStoreStatus | any;
}

export const initialAuthState: AuthState = {
  error: null,
  isAuthenticated: false,
  user: {
    displayName: '',
    username: '',
    role: '',
    lang: '',
  },
  token: '',
  status: 'initial',
};

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialAuthState,
    on(AuthActions.initAuth, (state) => ({
      ...state,
      status: 'pending',
    })),
    on(AuthActions.authInitSuccess, (state, { token, user }) => ({
      ...state,
      status: 'success',
      isAuthenticated: true,
      token,
      user,
    })),
    on(AuthActions.login, (state) => ({
      ...state,
      status: 'loading',
      error: null,
    })),
    on(AuthActions.loginSuccess, (state, { loginResponse }) => ({
      ...state,
      status: 'success',
      isAuthenticated: true,
      token: loginResponse.token,
      user: {
        displayName: loginResponse.displayName,
        username: loginResponse.username,
        role: loginResponse.role,
        lang: loginResponse.lang,
      },
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      status: 'error',
      error,
    })),
    on(AuthActions.logout, (state) => ({
      ...state,
      status: 'success',
      isAuthenticated: false,
      token: '',
      user: {
        displayName: '',
        username: '',
        role: '',
        lang: '',
      },
    }))
  ),
});
const reducer = createReducer(initialAuthState);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
