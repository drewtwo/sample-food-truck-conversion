/**
 * App Context Provider
 * Manages global state for authentication, truck data, and orders
 * 
 * Usage:
 * 1. Wrap your app with <AppContextProvider>
 * 2. Use useAppContext() hook to access state and dispatch
 * 
 * Example:
 * ```tsx
 * import { AppContextProvider } from './store/AppContext';
 * import { useAppContext } from './store/useAppContext';
 * 
 * function App() {
 *   return (
 *     <AppContextProvider>
 *       <MyComponent />
 *     </AppContextProvider>
 *   );
 * }
 * 
 * function MyComponent() {
 *   const { state, dispatch } = useAppContext();
 *   // Use state and dispatch here
 * }
 * ```
 */

import React, { createContext, useReducer, ReactNode } from 'react';
import {
  AppContextState,
  AuthState,
  TruckState,
  OrdersState,
  AuthAction,
  TruckAction,
  OrdersAction,
} from './types';
import { authReducer, truckReducer, ordersReducer } from './reducers';

/**
 * Initial state for authentication
 */
const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

/**
 * Initial state for trucks
 */
const initialTruckState: TruckState = {
  trucks: [],
  currentTruck: null,
  loading: false,
  error: null,
};

/**
 * Initial state for orders
 */
const initialOrdersState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

/**
 * Combined initial state
 */
const initialState: AppContextState = {
  auth: initialAuthState,
  truck: initialTruckState,
  orders: initialOrdersState,
};

/**
 * Context type definition
 */
export interface AppContextType {
  state: AppContextState;
  dispatch: React.Dispatch<AuthAction | TruckAction | OrdersAction>;
}

/**
 * Create the context
 */
export const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Combined reducer that handles all state slices
 */
const appReducer = (
  state: AppContextState,
  action: AuthAction | TruckAction | OrdersAction
): AppContextState => {
  // Determine which reducer should handle this action based on action type prefix
  if (action.type.startsWith('AUTH_')) {
    return {
      ...state,
      auth: authReducer(state.auth, action as AuthAction),
    };
  }

  if (action.type.startsWith('TRUCK_')) {
    return {
      ...state,
      truck: truckReducer(state.truck, action as TruckAction),
    };
  }

  if (action.type.startsWith('ORDERS_')) {
    return {
      ...state,
      orders: ordersReducer(state.orders, action as OrdersAction),
    };
  }

  return state;
};

/**
 * AppContextProvider component
 * Wraps the app and provides state management
 */
export interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value: AppContextType = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
