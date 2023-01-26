export interface AuthState {
  user?: User;
  token?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

