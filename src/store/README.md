# Store

This directory contains Redux store configuration, slices, and state management logic for the Food Truck application.

## Structure

The store is organized using Redux Toolkit with slice-based organization.

### Naming Conventions

- Slice files should be named in camelCase (e.g., `menuSlice.ts`, `orderSlice.ts`)
- Selectors should be named with `select` prefix (e.g., `selectMenuItems`)
- Thunks should be named descriptively (e.g., `fetchMenuItems`)
- Type files should be named `types.ts`

### File Organization

```
store/
├── index.ts
├── types.ts
├── slices/
│   ├── menuSlice.ts
│   ├── orderSlice.ts
│   ├── userSlice.ts
│   └── [other slices]
├── thunks/
│   ├── menuThunks.ts
│   ├── orderThunks.ts
│   └── [other thunks]
└── selectors/
    ├── menuSelectors.ts
    ├── orderSelectors.ts
    └── [other selectors]
```

## Best Practices

1. **Redux Toolkit**: Use Redux Toolkit for simplified state management
2. **Slices**: Organize state into logical slices
3. **Selectors**: Use selectors for accessing state to enable memoization
4. **Thunks**: Use async thunks for API calls
5. **Type Safety**: Define TypeScript types for all state and actions
6. **Immutability**: Redux Toolkit handles immutability with Immer

## Example Slice Structure

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setMenuItems, setLoading, setError } = menuSlice.actions;
export default menuSlice.reducer;
```

## Store Configuration

The main store should be configured in `index.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Selectors

Create selectors for accessing state:

```typescript
import { RootState } from '../index';

export const selectMenuItems = (state: RootState) => state.menu.items;
export const selectMenuLoading = (state: RootState) => state.menu.loading;
export const selectMenuError = (state: RootState) => state.menu.error;
```
