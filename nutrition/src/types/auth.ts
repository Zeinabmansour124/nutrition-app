export type UserRole = 'Nutri' | 'PrepPhy' | 'joueur';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  error?: string;
}