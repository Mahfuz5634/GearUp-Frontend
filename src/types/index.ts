export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  [key: string]: unknown;
}

export interface Gear {
  id: string;
  name: string;
  price: number;
  brand: string;
  category?: {
    name: string;
  };
  [key: string]: unknown;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data: {
    user: User;
  };
}
