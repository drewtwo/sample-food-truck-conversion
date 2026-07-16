/**
 * Type definitions for the app state management
 * Defines all types used across the Context API and reducers
 */

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'operator' | 'admin';
  createdAt: string;
}

/**
 * Truck data state
 */
export interface TruckState {
  trucks: Truck[];
  currentTruck: Truck | null;
  loading: boolean;
  error: string | null;
}

export interface Truck {
  id: string;
  name: string;
  location: Location;
  status: 'active' | 'inactive' | 'maintenance';
  menu: MenuItem[];
  operatingHours: OperatingHours;
  createdAt: string;
  updatedAt: string;
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
  available: boolean;
  image?: string;
}

export interface OperatingHours {
  monday: TimeRange;
  tuesday: TimeRange;
  wednesday: TimeRange;
  thursday: TimeRange;
  friday: TimeRange;
  saturday: TimeRange;
  sunday: TimeRange;
}

export interface TimeRange {
  open: string; // HH:MM format
  close: string; // HH:MM format
  closed: boolean;
}

/**
 * Orders state
 */
export interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

export interface Order {
  id: string;
  truckId: string;
  customerId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  estimatedReadyTime?: string;
  notes?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

/**
 * App context state - combines all sub-states
 */
export interface AppContextState {
  auth: AuthState;
  truck: TruckState;
  orders: OrdersState;
}

/**
 * Action types for reducers
 */
export type AuthAction =
  | { type: 'AUTH_LOGIN_START' }
  | { type: 'AUTH_LOGIN_SUCCESS'; payload: User }
  | { type: 'AUTH_LOGIN_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_SET_ERROR'; payload: string }
  | { type: 'AUTH_CLEAR_ERROR' };

export type TruckAction =
  | { type: 'TRUCK_FETCH_START' }
  | { type: 'TRUCK_FETCH_SUCCESS'; payload: Truck[] }
  | { type: 'TRUCK_FETCH_FAILURE'; payload: string }
  | { type: 'TRUCK_SET_CURRENT'; payload: Truck }
  | { type: 'TRUCK_UPDATE_START' }
  | { type: 'TRUCK_UPDATE_SUCCESS'; payload: Truck }
  | { type: 'TRUCK_UPDATE_FAILURE'; payload: string }
  | { type: 'TRUCK_SET_ERROR'; payload: string }
  | { type: 'TRUCK_CLEAR_ERROR' };

export type OrdersAction =
  | { type: 'ORDERS_FETCH_START' }
  | { type: 'ORDERS_FETCH_SUCCESS'; payload: Order[] }
  | { type: 'ORDERS_FETCH_FAILURE'; payload: string }
  | { type: 'ORDERS_SET_CURRENT'; payload: Order }
  | { type: 'ORDERS_CREATE_START' }
  | { type: 'ORDERS_CREATE_SUCCESS'; payload: Order }
  | { type: 'ORDERS_CREATE_FAILURE'; payload: string }
  | { type: 'ORDERS_UPDATE_START' }
  | { type: 'ORDERS_UPDATE_SUCCESS'; payload: Order }
  | { type: 'ORDERS_UPDATE_FAILURE'; payload: string }
  | { type: 'ORDERS_SET_ERROR'; payload: string }
  | { type: 'ORDERS_CLEAR_ERROR' };
