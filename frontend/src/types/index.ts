export interface AuthState {
  user?: User;
  token?: string;
}

export interface User {
  name: string;
  email: string;
  username: string;
  avatar: string | null;
}

export interface APIError {
  error: string | { message: string } | string[] | { message: string }[];
}

