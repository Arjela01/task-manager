
export interface LoginResponse {
  displayName: string,
  token: string,
  username:string,
  isSuccessful: boolean,
  errorMessage: string,
  role?:string;
  user: {
    id: number,
    name: string,
    email: string,
    role: string,
  },
}
