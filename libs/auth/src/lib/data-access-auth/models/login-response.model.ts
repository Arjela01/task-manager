export interface LoginResponse {
  displayName?: string;
  token: string;
  username?: string;
  isSuccessful?: boolean;
  errorMessage?: string;
  assignedTo?: string;
  role?: string;
  lang: string;
  user?: {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    lang?: string;
  };
}
