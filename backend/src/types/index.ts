export interface AuthState {
  user: SafeUser;
  token: string;
}

export interface SafeUser {
  name: string;
  email: string;
  username: string;
  avatar: string | null
}

export interface APIError {
  error: string | { message: string } | string[] | { message: string }[];
}

