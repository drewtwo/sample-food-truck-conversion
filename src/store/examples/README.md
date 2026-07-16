# Store Examples

This directory contains practical examples of how to use the AppContext and state management in your components.

## Available Examples

### 1. AuthExample

Demonstrates authentication state management including:
- Login/logout functionality
- Loading states
- Error handling
- User information display

**Location:** `AuthExample.tsx`

**Key Features:**
- Shows how to dispatch `AUTH_LOGIN_START`, `AUTH_LOGIN_SUCCESS`, `AUTH_LOGIN_FAILURE`
- Demonstrates conditional rendering based on authentication state
- Shows how to access user information from state

**Usage:**
```tsx
import { AuthExample } from '@store/examples';

function App() {
  return <AuthExample />;
}
```

### 2. TruckExample

Demonstrates truck state management including:
- Fetching trucks from API
- Selecting a truck
- Displaying truck information
- Loading and error states

**Location:** `TruckExample.tsx`

**Key Features:**
- Shows how to dispatch `TRUCK_FETCH_START`, `TRUCK_FETCH_SUCCESS`, `TRUCK_FETCH_FAILURE`
- Demonstrates `TRUCK_SET_CURRENT` action
- Shows how to render lists of trucks
- Highlights selected truck

**Usage:**
```tsx
import { TruckExample } from '@store/examples';

function App() {
  return <TruckExample />;
}
```

### 3. OrdersExample

Demonstrates orders state management including:
- Fetching orders
- Creating new orders
- Updating order status
- Displaying order details

**Location:** `OrdersExample.tsx`

**Key Features:**
- Shows how to dispatch `ORDERS_FETCH_START`, `ORDERS_FETCH_SUCCESS`, `ORDERS_FETCH_FAILURE`
- Demonstrates `ORDERS_CREATE_START`, `ORDERS_CREATE_SUCCESS`
- Shows how to dispatch `ORDERS_UPDATE_START`, `ORDERS_UPDATE_SUCCESS`
- Demonstrates status progression workflow

**Usage:**
```tsx
import { OrdersExample } from '@store/examples';

function App() {
  return <OrdersExample />;
}
```

## Common Patterns

### 1. Fetching Data

All examples follow a similar pattern for fetching data:

```tsx
useEffect(() => {
  const fetchData = async () => {
    // Start loading
    dispatch({ type: 'ACTION_FETCH_START' });

    try {
      // Call API
      const data = await api.fetchData();

      // Success
      dispatch({
        type: 'ACTION_FETCH_SUCCESS',
        payload: data,
      });
    } catch (error) {
      // Failure
      dispatch({
        type: 'ACTION_FETCH_FAILURE',
        payload: error.message,
      });
    }
  };

  fetchData();
}, [dispatch]);
```

### 2. Handling Loading States

```tsx
if (state.loading) {
  return <ActivityIndicator />;
}

if (state.error) {
  return <Text>Error: {state.error}</Text>;
}

return <YourContent />;
```

### 3. Selecting Items

```tsx
const handleSelect = (item: Item) => {
  dispatch({
    type: 'ACTION_SET_CURRENT',
    payload: item,
  });
};
```

### 4. Creating Items

```tsx
const handleCreate = async (data: CreateData) => {
  dispatch({ type: 'ACTION_CREATE_START' });

  try {
    const newItem = await api.create(data);
    dispatch({
      type: 'ACTION_CREATE_SUCCESS',
      payload: newItem,
    });
  } catch (error) {
    dispatch({
      type: 'ACTION_CREATE_FAILURE',
      payload: error.message,
    });
  }
};
```

### 5. Updating Items

```tsx
const handleUpdate = async (item: Item, updates: Partial<Item>) => {
  dispatch({ type: 'ACTION_UPDATE_START' });

  try {
    const updatedItem = await api.update(item.id, updates);
    dispatch({
      type: 'ACTION_UPDATE_SUCCESS',
      payload: updatedItem,
    });
  } catch (error) {
    dispatch({
      type: 'ACTION_UPDATE_FAILURE',
      payload: error.message,
    });
  }
};
```

## Styling Patterns

All examples use consistent styling patterns:

- **Container**: Full-screen flex layout with padding
- **Title**: Large, bold text at the top
- **Items**: Card-style items with borders and shadows
- **Selected State**: Highlighted border and background color
- **Status Indicators**: Color-coded status badges
- **Buttons**: Consistent button styling with proper touch targets

## Testing Examples

When testing components that use these examples:

```tsx
import { render } from '@testing-library/react-native';
import { AppContextProvider } from '@store/AppContext';
import { AuthExample } from '@store/examples';

test('renders auth example', () => {
  const { getByText } = render(
    <AppContextProvider>
      <AuthExample />
    </AppContextProvider>
  );

  expect(getByText('Not Authenticated')).toBeTruthy();
});
```

## Adapting Examples for Your Use Case

To adapt these examples for your specific needs:

1. **Replace mock data** with actual API calls
2. **Adjust styling** to match your app's design system
3. **Add validation** for user inputs
4. **Implement error recovery** strategies
5. **Add analytics** tracking for important actions
6. **Optimize performance** with memoization if needed

## Next Steps

- Review the main [Store README](../README.md) for detailed documentation
- Check `src/store/types.ts` for all available types
- Look at `src/store/reducers.ts` to understand action handling
- Explore `src/store/AppContext.tsx` to see the provider implementation
