# State Management Documentation

## Overview

The Food Truck app uses React Context API with `useReducer` for global state management. This provides a centralized, predictable way to manage application state across authentication, truck data, and orders.

## Architecture

### State Structure

The app state is organized into three main slices:

```
AppContextState
├── auth: AuthState
│   ├── isAuthenticated: boolean
│   ├── user: User | null
│   ├── loading: boolean
│   └── error: string | null
├── truck: TruckState
│   ├── trucks: Truck[]
│   ├── currentTruck: Truck | null
│   ├── loading: boolean
│   └── error: string | null
└── orders: OrdersState
    ├── orders: Order[]
    ├── currentOrder: Order | null
    ├── loading: boolean
    └── error: string | null
```

## Setup

### 1. Wrap Your App with Provider

In your root component (e.g., `App.tsx`):

```tsx
import { AppContextProvider } from './store/AppContext';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <AppContextProvider>
      <Navigation />
    </AppContextProvider>
  );
}
```

### 2. Use the Hook in Components

```tsx
import { useAppContext } from './store/useAppContext';

function MyComponent() {
  const { state, dispatch } = useAppContext();

  return (
    <View>
      <Text>{state.auth.user?.name}</Text>
    </View>
  );
}
```

## State Slices

### Authentication State (auth)

Manages user authentication and profile information.

**State Properties:**
- `isAuthenticated`: Whether user is logged in
- `user`: Current user object (null if not authenticated)
- `loading`: Whether an auth operation is in progress
- `error`: Error message if auth operation failed

**Actions:**
- `AUTH_LOGIN_START`: Begin login process
- `AUTH_LOGIN_SUCCESS`: Login successful, payload contains User
- `AUTH_LOGIN_FAILURE`: Login failed, payload contains error message
- `AUTH_LOGOUT`: Logout user
- `AUTH_SET_ERROR`: Set an error message
- `AUTH_CLEAR_ERROR`: Clear error message

**Example Usage:**

```tsx
const { state, dispatch } = useAppContext();

// Start login
dispatch({ type: 'AUTH_LOGIN_START' });

// On success
dispatch({
  type: 'AUTH_LOGIN_SUCCESS',
  payload: {
    id: '123',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'operator',
    createdAt: new Date().toISOString(),
  },
});

// On failure
dispatch({
  type: 'AUTH_LOGIN_FAILURE',
  payload: 'Invalid credentials',
});

// Logout
dispatch({ type: 'AUTH_LOGOUT' });
```

### Truck State (truck)

Manages food truck data and current truck selection.

**State Properties:**
- `trucks`: Array of all trucks
- `currentTruck`: Currently selected truck (null if none selected)
- `loading`: Whether a truck operation is in progress
- `error`: Error message if truck operation failed

**Actions:**
- `TRUCK_FETCH_START`: Begin fetching trucks
- `TRUCK_FETCH_SUCCESS`: Trucks fetched, payload contains Truck[]
- `TRUCK_FETCH_FAILURE`: Fetch failed, payload contains error message
- `TRUCK_SET_CURRENT`: Set current truck, payload contains Truck
- `TRUCK_UPDATE_START`: Begin updating truck
- `TRUCK_UPDATE_SUCCESS`: Truck updated, payload contains updated Truck
- `TRUCK_UPDATE_FAILURE`: Update failed, payload contains error message
- `TRUCK_SET_ERROR`: Set an error message
- `TRUCK_CLEAR_ERROR`: Clear error message

**Example Usage:**

```tsx
const { state, dispatch } = useAppContext();

// Fetch trucks
dispatch({ type: 'TRUCK_FETCH_START' });
// After API call succeeds:
dispatch({
  type: 'TRUCK_FETCH_SUCCESS',
  payload: [
    {
      id: 'truck-1',
      name: 'Taco Truck',
      location: { /* ... */ },
      status: 'active',
      menu: [],
      operatingHours: { /* ... */ },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
});

// Set current truck
dispatch({
  type: 'TRUCK_SET_CURRENT',
  payload: state.truck.trucks[0],
});

// Update truck
dispatch({ type: 'TRUCK_UPDATE_START' });
dispatch({
  type: 'TRUCK_UPDATE_SUCCESS',
  payload: updatedTruck,
});
```

### Orders State (orders)

Manages customer orders and order history.

**State Properties:**
- `orders`: Array of all orders
- `currentOrder`: Currently selected order (null if none selected)
- `loading`: Whether an order operation is in progress
- `error`: Error message if order operation failed

**Actions:**
- `ORDERS_FETCH_START`: Begin fetching orders
- `ORDERS_FETCH_SUCCESS`: Orders fetched, payload contains Order[]
- `ORDERS_FETCH_FAILURE`: Fetch failed, payload contains error message
- `ORDERS_SET_CURRENT`: Set current order, payload contains Order
- `ORDERS_CREATE_START`: Begin creating order
- `ORDERS_CREATE_SUCCESS`: Order created, payload contains new Order
- `ORDERS_CREATE_FAILURE`: Creation failed, payload contains error message
- `ORDERS_UPDATE_START`: Begin updating order
- `ORDERS_UPDATE_SUCCESS`: Order updated, payload contains updated Order
- `ORDERS_UPDATE_FAILURE`: Update failed, payload contains error message
- `ORDERS_SET_ERROR`: Set an error message
- `ORDERS_CLEAR_ERROR`: Clear error message

**Example Usage:**

```tsx
const { state, dispatch } = useAppContext();

// Create order
dispatch({ type: 'ORDERS_CREATE_START' });
dispatch({
  type: 'ORDERS_CREATE_SUCCESS',
  payload: {
    id: 'order-1',
    truckId: 'truck-1',
    customerId: 'customer-1',
    items: [
      {
        menuItemId: 'item-1',
        name: 'Taco',
        quantity: 2,
        price: 3.99,
      },
    ],
    status: 'pending',
    totalPrice: 7.98,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});

// Update order status
dispatch({ type: 'ORDERS_UPDATE_START' });
dispatch({
  type: 'ORDERS_UPDATE_SUCCESS',
  payload: {
    ...state.orders.currentOrder,
    status: 'confirmed',
  },
});
```

## Reducer Patterns

### Pure Functions

All reducers are pure functions that:
- Take current state and an action
- Return a new state object
- Never mutate the original state
- Have no side effects

### Immutable Updates

When updating nested state, always create new objects:

```tsx
// ❌ Wrong - mutates state
state.auth.user.name = 'New Name';

// ✅ Correct - creates new object
{
  ...state,
  auth: {
    ...state.auth,
    user: {
      ...state.auth.user,
      name: 'New Name',
    },
  }
}
```

### Action Type Naming

Action types follow a consistent pattern:

```
[SLICE]_[OPERATION]_[STATUS]
```

Examples:
- `AUTH_LOGIN_START`
- `TRUCK_FETCH_SUCCESS`
- `ORDERS_UPDATE_FAILURE`

## Best Practices

### 1. Always Check Context is Available

```tsx
// This will throw an error if used outside AppContextProvider
const { state, dispatch } = useAppContext();
```

### 2. Handle Loading States

```tsx
const { state } = useAppContext();

if (state.truck.loading) {
  return <ActivityIndicator />;
}

if (state.truck.error) {
  return <Text>Error: {state.truck.error}</Text>;
}

return <TruckList trucks={state.truck.trucks} />;
```

### 3. Dispatch Actions Consistently

```tsx
// ✅ Good - clear action flow
dispatch({ type: 'ORDERS_CREATE_START' });
try {
  const newOrder = await createOrderAPI(orderData);
  dispatch({
    type: 'ORDERS_CREATE_SUCCESS',
    payload: newOrder,
  });
} catch (error) {
  dispatch({
    type: 'ORDERS_CREATE_FAILURE',
    payload: error.message,
  });
}
```

### 4. Use Selectors for Complex State Access

For frequently accessed state combinations, create selector functions:

```tsx
// store/selectors.ts
export const selectIsAuthenticated = (state: AppContextState) =>
  state.auth.isAuthenticated;

export const selectCurrentUser = (state: AppContextState) =>
  state.auth.user;

export const selectCurrentTruck = (state: AppContextState) =>
  state.truck.currentTruck;

// In component
const { state } = useAppContext();
const isAuthenticated = selectIsAuthenticated(state);
```

### 5. Memoize Context Value

The context value is already memoized in AppContextProvider, but ensure components using the hook are wrapped with `React.memo` if needed for performance:

```tsx
const MyComponent = React.memo(({ data }) => {
  const { state } = useAppContext();
  return <View>{/* ... */}</View>;
});
```

## Type Safety

All types are defined in `src/store/types.ts`. Always import and use these types:

```tsx
import {
  AppContextState,
  AuthState,
  TruckState,
  OrdersState,
  User,
  Truck,
  Order,
} from './store/types';
```

## Testing

When testing components that use `useAppContext`, wrap them with a mock provider:

```tsx
import { render } from '@testing-library/react-native';
import { AppContextProvider } from './store/AppContext';

test('renders user name', () => {
  const { getByText } = render(
    <AppContextProvider>
      <MyComponent />
    </AppContextProvider>
  );

  expect(getByText('John Doe')).toBeTruthy();
});
```

## Future Enhancements

- Add middleware for logging and debugging
- Implement persistence layer (AsyncStorage)
- Add devtools integration
- Create custom hooks for common operations (useAuth, useTrucks, useOrders)
- Add optimistic updates for better UX
