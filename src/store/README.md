# Store Directory

This directory contains state management configuration and slices.

## Structure

The store uses Redux Toolkit for centralized state management.

### Naming Convention

- Slice files should be named descriptively (e.g., `authSlice.ts`, `menuSlice.ts`)
- Each slice represents a domain of state
- Store configuration is in `index.ts`

### Example Structure

```
src/store/
├── index.ts
├── authSlice.ts
├── menuSlice.ts
├── orderSlice.ts
└── hooks.ts
```

## Key Files

- **index.ts**: Store configuration and setup
- **[domain]Slice.ts**: Redux Toolkit slices for each domain
- **hooks.ts**: Custom hooks for accessing store (useAppDispatch, useAppSelector)

## Best Practices

1. **Slice Organization**: One slice per domain/feature
2. **Async Thunks**: Use `createAsyncThunk` for API calls
3. **Selectors**: Create reusable selectors for accessing state
4. **Type Safety**: Export types from slices for use in components
5. **Immutability**: Redux Toolkit handles immutability automatically

## Slice Template

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MyState = {
  data: [],
  loading: false,
  error: null,
};

const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = mySlice.actions;
export default mySlice.reducer;
```

## Integration

The store is configured in `index.ts` and provided to the app via Redux Provider in `App.tsx`.
