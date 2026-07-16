/**
 * State Selectors
 * 
 * Selector functions for accessing and deriving state values.
 * These help reduce boilerplate and make state access more consistent.
 * 
 * Usage:
 * ```tsx
 * import { selectIsAuthenticated, selectCurrentUser } from './selectors';
 * import { useAppContext } from './useAppContext';
 * 
 * function MyComponent() {
 *   const { state } = useAppContext();
 *   const isAuthenticated = selectIsAuthenticated(state);
 *   const user = selectCurrentUser(state);
 *   
 *   return <Text>{user?.name}</Text>;
 * }
 * ```
 */

import { AppContextState, User, Truck, Order } from './types';

/**
 * Authentication Selectors
 */

/**
 * Select whether user is authenticated
 */
export const selectIsAuthenticated = (state: AppContextState): boolean =>
  state.auth.isAuthenticated;

/**
 * Select current user
 */
export const selectCurrentUser = (state: AppContextState): User | null =>
  state.auth.user;

/**
 * Select auth loading state
 */
export const selectAuthLoading = (state: AppContextState): boolean =>
  state.auth.loading;

/**
 * Select auth error
 */
export const selectAuthError = (state: AppContextState): string | null =>
  state.auth.error;

/**
 * Select user role
 */
export const selectUserRole = (state: AppContextState): string | null =>
  state.auth.user?.role ?? null;

/**
 * Truck Selectors
 */

/**
 * Select all trucks
 */
export const selectAllTrucks = (state: AppContextState): Truck[] =>
  state.truck.trucks;

/**
 * Select current truck
 */
export const selectCurrentTruck = (state: AppContextState): Truck | null =>
  state.truck.currentTruck;

/**
 * Select truck loading state
 */
export const selectTruckLoading = (state: AppContextState): boolean =>
  state.truck.loading;

/**
 * Select truck error
 */
export const selectTruckError = (state: AppContextState): string | null =>
  state.truck.error;

/**
 * Select number of trucks
 */
export const selectTruckCount = (state: AppContextState): number =>
  state.truck.trucks.length;

/**
 * Select active trucks
 */
export const selectActiveTrucks = (state: AppContextState): Truck[] =>
  state.truck.trucks.filter((truck) => truck.status === 'active');

/**
 * Select truck by ID
 */
export const selectTruckById = (state: AppContextState, truckId: string): Truck | undefined =>
  state.truck.trucks.find((truck) => truck.id === truckId);

/**
 * Select current truck menu
 */
export const selectCurrentTruckMenu = (state: AppContextState) =>
  state.truck.currentTruck?.menu ?? [];

/**
 * Select available menu items for current truck
 */
export const selectAvailableMenuItems = (state: AppContextState) =>
  selectCurrentTruckMenu(state).filter((item) => item.available);

/**
 * Orders Selectors
 */

/**
 * Select all orders
 */
export const selectAllOrders = (state: AppContextState): Order[] =>
  state.orders.orders;

/**
 * Select current order
 */
export const selectCurrentOrder = (state: AppContextState): Order | null =>
  state.orders.currentOrder;

/**
 * Select orders loading state
 */
export const selectOrdersLoading = (state: AppContextState): boolean =>
  state.orders.loading;

/**
 * Select orders error
 */
export const selectOrdersError = (state: AppContextState): string | null =>
  state.orders.error;

/**
 * Select number of orders
 */
export const selectOrderCount = (state: AppContextState): number =>
  state.orders.orders.length;

/**
 * Select pending orders
 */
export const selectPendingOrders = (state: AppContextState): Order[] =>
  state.orders.orders.filter((order) => order.status === 'pending');

/**
 * Select completed orders
 */
export const selectCompletedOrders = (state: AppContextState): Order[] =>
  state.orders.orders.filter((order) => order.status === 'completed');

/**
 * Select orders for specific truck
 */
export const selectOrdersByTruck = (state: AppContextState, truckId: string): Order[] =>
  state.orders.orders.filter((order) => order.truckId === truckId);

/**
 * Select orders for specific customer
 */
export const selectOrdersByCustomer = (state: AppContextState, customerId: string): Order[] =>
  state.orders.orders.filter((order) => order.customerId === customerId);

/**
 * Select order by ID
 */
export const selectOrderById = (state: AppContextState, orderId: string): Order | undefined =>
  state.orders.orders.find((order) => order.id === orderId);

/**
 * Select total revenue from all orders
 */
export const selectTotalRevenue = (state: AppContextState): number =>
  state.orders.orders.reduce((total, order) => total + order.totalPrice, 0);

/**
 * Select average order value
 */
export const selectAverageOrderValue = (state: AppContextState): number => {
  const orders = state.orders.orders;
  if (orders.length === 0) return 0;
  return selectTotalRevenue(state) / orders.length;
};

/**
 * Combined Selectors
 */

/**
 * Select all loading states
 */
export const selectIsAnyLoading = (state: AppContextState): boolean =>
  state.auth.loading || state.truck.loading || state.orders.loading;

/**
 * Select all errors
 */
export const selectAllErrors = (state: AppContextState): (string | null)[] => [
  state.auth.error,
  state.truck.error,
  state.orders.error,
];

/**
 * Select if there are any errors
 */
export const selectHasErrors = (state: AppContextState): boolean =>
  selectAllErrors(state).some((error) => error !== null);

/**
 * Select app readiness (authenticated and data loaded)
 */
export const selectAppReady = (state: AppContextState): boolean =>
  state.auth.isAuthenticated && !selectIsAnyLoading(state) && !selectHasErrors(state);

/**
 * Select dashboard summary
 */
export const selectDashboardSummary = (state: AppContextState) => ({
  isAuthenticated: selectIsAuthenticated(state),
  user: selectCurrentUser(state),
  truckCount: selectTruckCount(state),
  activeTrucks: selectActiveTrucks(state).length,
  currentTruck: selectCurrentTruck(state),
  orderCount: selectOrderCount(state),
  pendingOrders: selectPendingOrders(state).length,
  totalRevenue: selectTotalRevenue(state),
  averageOrderValue: selectAverageOrderValue(state),
  isLoading: selectIsAnyLoading(state),
  hasErrors: selectHasErrors(state),
});
