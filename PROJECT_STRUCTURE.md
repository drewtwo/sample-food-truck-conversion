# Project Structure Documentation

This document outlines the directory structure and organization conventions for the Food Truck React Native application.

## Directory Overview

```
food-truck-app/
├── src/
│   ├── screens/           # Full-screen components
│   ├── components/        # Reusable UI components
│   ├── navigation/        # Navigation configuration
│   ├── store/            # Redux state management
│   ├── api/              # API client and services
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions and hooks
│   ├── assets/           # Static assets (images, fonts, etc.)
│   └── App.tsx           # Root application component
├── __tests__/            # Test files
├── app.json              # Expo/React Native configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── babel.config.js       # Babel configuration
└── README.md             # Project README
```

## Directory Descriptions

### `/src/screens`
Contains all screen components that represent full-screen views in the application.

**Key Points:**
- One screen per file
- Named in PascalCase (e.g., `HomeScreen.tsx`)
- Should be relatively thin, delegating logic to components and store
- Use navigation props from React Navigation

**Example Files:**
- `HomeScreen.tsx` - Main home/dashboard screen
- `MenuScreen.tsx` - Menu browsing screen
- `OrderScreen.tsx` - Order creation/management screen
- `ProfileScreen.tsx` - User profile screen

### `/src/components`
Contains reusable UI components used across screens.

**Key Points:**
- Modular and focused on single responsibility
- Named in PascalCase (e.g., `Button.tsx`, `Card.tsx`)
- Can be organized in subdirectories for related components
- Should be presentational (dumb components)

**Example Files:**
- `Button.tsx` - Reusable button component
- `Card.tsx` - Card layout component
- `Header.tsx` - Header component
- `MenuItem.tsx` - Menu item display component
- `common/Loader.tsx` - Loading indicator

### `/src/navigation`
Contains all navigation configuration and setup using React Navigation.

**Key Points:**
- Centralized routing configuration
- Separate stacks for auth and app navigation
- Type-safe navigation params
- Deep linking configuration

**Example Files:**
- `RootNavigator.tsx` - Main navigation entry point
- `AuthStack.tsx` - Authentication navigation stack
- `AppStack.tsx` - Main app navigation stack
- `types.ts` - Navigation param types
- `linking.ts` - Deep linking configuration

### `/src/store`
Contains Redux Toolkit state management configuration.

**Key Points:**
- Organized by feature/domain (slices)
- Centralized state management
- Async thunks for API calls
- Custom hooks for accessing store

**Example Files:**
- `index.ts` - Store configuration
- `authSlice.ts` - Authentication state
- `menuSlice.ts` - Menu data state
- `orderSlice.ts` - Order state
- `hooks.ts` - Custom Redux hooks

### `/src/api`
Contains API client configuration and service functions.

**Key Points:**
- Centralized HTTP client setup
- Service functions organized by domain
- Type-safe API responses
- Error handling and interceptors

**Example Files:**
- `client.ts` - HTTP client configuration
- `authService.ts` - Authentication API calls
- `menuService.ts` - Menu API calls
- `orderService.ts` - Order API calls
- `types.ts` - API response types

### `/src/types`
Contains all TypeScript type definitions and interfaces.

**Key Points:**
- Centralized type definitions
- Organized by domain/feature
- Exported from `index.ts` for easy importing
- Reusable interfaces and types

**Example Files:**
- `index.ts` - Central export file
- `auth.ts` - Authentication types
- `menu.ts` - Menu types
- `order.ts` - Order types
- `common.ts` - Shared types
- `api.ts` - API-related types

### `/src/utils`
Contains utility functions, helpers, and custom hooks.

**Key Points:**
- Pure functions when possible
- Custom hooks for reusable logic
- Well-documented with JSDoc
- Organized by purpose

**Example Files:**
- `formatters.ts` - Data formatting functions
- `validators.ts` - Input validation functions
- `helpers.ts` - General helper functions
- `constants.ts` - Application constants
- `useAsync.ts` - Async operation hook
- `useFetch.ts` - Data fetching hook

### `/src/assets`
Contains static assets like images, fonts, and animations.

**Key Points:**
- Organized by asset type
- Optimized for performance
- Consistent naming conventions
- Supports multiple resolutions

**Example Files:**
- `images/logo.png` - Application logo
- `icons/home.png` - Navigation icons
- `fonts/Roboto-Regular.ttf` - Custom fonts
- `animations/loading.json` - Lottie animations

## Naming Conventions

### Files and Directories
- **Directories**: lowercase with hyphens (e.g., `src/components/`)
- **Components**: PascalCase (e.g., `HomeScreen.tsx`, `Button.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `useAsync.ts`)
- **Types**: PascalCase for interfaces/types (e.g., `User`, `MenuItem`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)

### Code Organization
- **Imports**: Group by external, internal, then relative imports
- **Exports**: Use default exports for components, named exports for utilities
- **Props Interfaces**: Suffix with `Props` (e.g., `ButtonProps`, `CardProps`)
- **State Types**: Suffix with `State` (e.g., `AuthState`, `MenuState`)

## Import Patterns

### Absolute Imports (Recommended)
```typescript
import { Button } from 'src/components';
import { useAuth } from 'src/store/hooks';
import { formatDate } from 'src/utils/formatters';
import type { User } from 'src/types';
```

### Relative Imports (For Local References)
```typescript
import { Header } from './Header';
import { useLocalState } from './hooks';
```

## Best Practices

### 1. Component Organization
- Keep components small and focused
- Extract complex logic to custom hooks
- Use composition over inheritance
- Implement proper TypeScript typing

### 2. State Management
- Use Redux for global state
- Use local state for component-specific state
- Use custom hooks for shared logic
- Keep state normalized and flat

### 3. API Integration
- Centralize API calls in services
- Use async thunks for API calls in Redux
- Implement proper error handling
- Add request/response interceptors

### 4. Type Safety
- Always use TypeScript for type safety
- Define interfaces for all data structures
- Export types from `src/types/`
- Use strict TypeScript settings

### 5. Performance
- Memoize expensive computations
- Use React.memo for component optimization
- Implement proper list rendering with keys
- Lazy load screens when possible

### 6. Testing
- Write unit tests for utilities
- Write integration tests for screens
- Test Redux slices and selectors
- Maintain >80% code coverage

## File Size Guidelines

- **Components**: Keep under 300 lines
- **Screens**: Keep under 400 lines
- **Services**: Keep under 200 lines
- **Slices**: Keep under 250 lines
- **Utilities**: Keep under 150 lines

If a file exceeds these limits, consider breaking it into smaller, focused files.

## Common Patterns

### Screen with Redux
```typescript
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { selectMenuItems, fetchMenuItems } from 'src/store/menuSlice';

const MenuScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectMenuItems);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  return (
    <View>
      {items.map(item => <MenuItem key={item.id} item={item} />)}
    </View>
  );
};
```

### Custom Hook for Data Fetching
```typescript
export const useFetchMenuItems = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(selectMenuState);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  return { data, loading, error };
};
```

### Reusable Component
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

## Integration Points

### App.tsx
The root component that:
- Provides Redux store
- Sets up navigation
- Handles app-level state
- Manages theme/styling

### Navigation
- Handles routing between screens
- Manages navigation state
- Supports deep linking
- Type-safe navigation params

### Store
- Manages global application state
- Handles async operations
- Provides selectors for components
- Integrates with API services

### API Services
- Handles all HTTP requests
- Manages authentication
- Implements error handling
- Provides typed responses

## Development Workflow

1. **Create Types**: Define interfaces in `src/types/`
2. **Create API Service**: Add API calls in `src/api/`
3. **Create Redux Slice**: Add state management in `src/store/`
4. **Create Components**: Build reusable UI in `src/components/`
5. **Create Screen**: Assemble screen in `src/screens/`
6. **Add Navigation**: Register screen in `src/navigation/`
7. **Test**: Write tests for all new code

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Expo Documentation](https://docs.expo.dev/)

## Questions or Issues?

Refer to the individual README files in each directory for more detailed information about that specific area of the codebase.
