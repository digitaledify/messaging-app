export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
