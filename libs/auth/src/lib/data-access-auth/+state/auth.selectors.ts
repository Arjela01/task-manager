
import { authFeature} from './auth.reducer';


export const {
  selectAuthState,
  selectStatus,
  selectError,
  selectIsAuthenticated,
  selectUser,
  selectToken,
} = authFeature;

export const authQuery = {
  selectAuthState,
  selectStatus,
  selectError,
  selectIsAuthenticated,
  selectUser,
  selectToken,
};