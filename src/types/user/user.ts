import { Address } from "./address";

export interface User {
  id: string;
  name: string;
  role: 'user' | 'admin' | 'seller';
  addresses: Address[];
  email: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
