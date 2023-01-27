export interface AuthState {
  user: SafeUser;
  token: string;
}

export interface SafeUser {
  name: string;
  email: string;
}

export interface APIError {
  error: string | { message: string } | string[] | { message: string }[];
}

