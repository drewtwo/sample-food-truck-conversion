/**
 * Application Types
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
}

export interface FoodTruck {
  id: string;
  name: string;
  description: string;
  location: Location;
  menu: MenuItem[];
  rating: number;
  imageUrl?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
}

export interface Order {
  id: string;
  userId: string;
  foodTruckId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  completedAt?: Date;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Review {
  id: string;
  userId: string;
  foodTruckId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
