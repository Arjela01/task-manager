import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const authQuery = {
  selectIsLoading: createSelector(
    selectAuthState,
    (state) => state.status === 'loading'
  ),
  selectError: createSelector(selectAuthState, (state) => state.error),
  selectIsAuthenticated: createSelector(
    selectAuthState,
    (state) => state.isAuthenticated
  ),
  selectUser: createSelector(selectAuthState, (state) => state.user),
  selectToken: createSelector(selectAuthState, (state) => state.token),
};
