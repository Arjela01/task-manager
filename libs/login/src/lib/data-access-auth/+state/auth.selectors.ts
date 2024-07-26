import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

const { selectAuthState, selectError, selectUser, selectToken } = authFeature;

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: any) => state.status === 'loading'
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: any) => state.isAuthenticated
);

export const authQuery = {
  selectAuthState,
  selectIsLoading,
  selectError,
  selectIsAuthenticated,
  selectUser,
  selectToken,
};
