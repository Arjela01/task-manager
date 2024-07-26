export interface User {
  displayName: string;
  username: string;
  role?: string;
}

export const USER_STORAGE_KEY = 'user';

export type GenericStoreStatus =
    | 'pending'
    | 'loading'
    | 'success'
    | 'error'
    | 'initial'
    | 'saving'
    | 'deleting';