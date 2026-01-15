import { Address } from "./address";

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin' | 'seller';
  isAdmin: boolean;
  addresses: Address[];
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  dateCreated: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  firstName: string;
  lastName: string;
  address?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
