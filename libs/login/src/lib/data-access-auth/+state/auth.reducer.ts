import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { GenericStoreStatus, User } from '../models/user.model';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  error: string | null;
  isAuthenticated: boolean;
  user: User;
  token: string;
  status: GenericStoreStatus;
}

export const initialAuthState: AuthState = {
  error: null,
  isAuthenticated: false,
  user: {
    displayName: '',
    username: '',
    role: '',
  },
  token: '',
  status: '' as any,
};
export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialAuthState,
    on(AuthActions.initAuth, (state) => ({
      ...state,
      status: 'pending' as GenericStoreStatus,
    })),
    on(AuthActions.loadAuthSuccess, (state, { token, user }) => ({
      ...state,
      status: 'pending' as GenericStoreStatus,
      isAuthenticated: true,
      token: token,
      user: user,
    })),
    on(AuthActions.login, (state) => ({
      ...state,
      status: 'loading' as GenericStoreStatus,
      error: '',
    })),
    on(AuthActions.loginSuccess, (state, { loginResponse }) => ({
      ...state,
      status: 'loading' as GenericStoreStatus,
      error: null,
      isAuthenticated: true,
      user: {
        displayName: loginResponse.displayName,
        username: loginResponse.username,
      },
      token: loginResponse.token,
    })),
    on(AuthActions.logout, (state) => ({
      ...state,
      status: 'success' as GenericStoreStatus,
      error: null,
      isAuthenticated: false,
      user: {
        displayName: '',
        username: '',
        role: '',
      },
      token: '',
    }))
  ),
});

const reducer = createReducer(initialAuthState);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
