/**
 * Store module exports
 * Central export point for all state management utilities
 */

// Context and Provider
export { AppContext, AppContextProvider } from './AppContext';
export type { AppContextType, AppContextProviderProps } from './AppContext';

// Hook
export { useAppContext } from './useAppContext';

// Reducers
export { authReducer, truckReducer, ordersReducer } from './reducers';

// Types
export type {
  AppContextState,
  AuthState,
  AuthAction,
  TruckState,
  TruckAction,
  OrdersState,
  OrdersAction,
  User,
  Truck,
  Location,
  MenuItem,
  OperatingHours,
  TimeRange,
  Order,
  OrderItem,
} from './types';

// Selectors
export * from './selectors';

// Examples
export { AuthExample, TruckExample, OrdersExample } from './examples';
