export interface User {
  id?: number;
  displayName?: string;
  username?: string;
  role?: string;
  lang: string;
}

export type GenericStoreStatus =
  | 'pending'
  | 'loading'
  | 'success'
  | 'error'
  | 'initial'
  | 'saving'
  | 'deleting';
