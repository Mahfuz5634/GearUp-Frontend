export type Role = 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PAID' | 'PICKED_UP' | 'RETURNED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Gear {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  stock: number;
  model?: string | null;
  condition?: string | null;
  features?: string[];
  imageUrl?: string;
  categoryId: string;
  category?: Category;
  providerId: string;
  provider?: User;
  reviews?: Review[];
  rentals?: RentalOrder[];
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RentalOrder {
  id: string;
  customerId: string;
  customer?: User;
  gearId: string;
  gear?: Gear;
  startDate: string;
  endDate: string;
  status: OrderStatus;
  payment?: Payment;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  rentalOrderId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  paidAt?: string;
  createdAt?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  customer?: User;
  gearId: string;
  createdAt?: string;
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
