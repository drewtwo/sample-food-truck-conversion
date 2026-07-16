/**
 * useAppContext Hook
 * Custom hook to access the App Context
 * 
 * Usage:
 * ```tsx
 * import { useAppContext } from './store/useAppContext';
 * 
 * function MyComponent() {
 *   const { state, dispatch } = useAppContext();
 *   
 *   // Access auth state
 *   const { isAuthenticated, user } = state.auth;
 *   
 *   // Access truck state
 *   const { trucks, currentTruck } = state.truck;
 *   
 *   // Access orders state
 *   const { orders, currentOrder } = state.orders;
 *   
 *   // Dispatch actions
 *   dispatch({ type: 'AUTH_LOGIN_START' });
 * }
 * ```
 */

import { useContext } from 'react';
import { AppContext, AppContextType } from './AppContext';

/**
 * Hook to use the App Context
 * Must be called within a component wrapped by AppContextProvider
 * 
 * @returns {AppContextType} The context value containing state and dispatch
 * @throws {Error} If used outside of AppContextProvider
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(
      'useAppContext must be used within an AppContextProvider. ' +
        'Make sure your component is wrapped with <AppContextProvider> at the root of your app.'
    );
  }

  return context;
};

export default useAppContext;
