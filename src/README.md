# Source Code Structure

This document describes the organization and conventions for the Food Truck React Native application source code.

## Directory Structure

```
src/
├── screens/          # Full-page screen components
├── components/       # Reusable UI components
├── navigation/       # Navigation configuration and navigators
├── store/           # Redux state management
├── api/             # API client and service layer
├── types/           # Shared TypeScript type definitions
├── utils/           # Utility functions and helpers
├── assets/          # Images, colors, fonts, and other assets
└── App.tsx          # Root application component
```

## Directory Descriptions

### `/screens`
Contains all screen components that represent full pages or major views in the application.

**Key Points:**
- One screen per file
- Named in PascalCase (e.g., `HomeScreen.tsx`)
- Should be functional components using React hooks
- Receive navigation props from React Navigation
- Can compose multiple components from `/components`

**See:** `src/screens/README.md`

### `/components`
Contains reusable UI components used across multiple screens.

**Key Points:**
- Organized by feature or functionality
- Named in PascalCase (e.g., `Button.tsx`, `MenuCard.tsx`)
- Should be self-contained and reusable
- Define clear TypeScript interfaces for props
- Can be grouped in subdirectories (e.g., `common/`, `menu/`)

**See:** `src/components/README.md`

### `/navigation`
Contains all navigation configuration and navigator setup.

**Key Points:**
- Centralized navigation logic
- Type-safe navigation with TypeScript
- Handles authentication state
- Configures stack, tab, and drawer navigators
- Manages deep linking

**See:** `src/navigation/README.md`

### `/store`
Contains Redux store configuration and state management logic.

**Key Points:**
- Uses Redux Toolkit for simplified state management
- Organized into slices by feature
- Includes selectors for accessing state
- Includes thunks for async operations
- Type-safe with TypeScript

**See:** `src/store/README.md`

### `/api`
Contains API client configuration and service functions.

**Key Points:**
- Centralized HTTP client setup (axios, fetch, etc.)
- Service functions for each API endpoint
- Error handling and interceptors
- Type definitions for API requests/responses
- Uses environment variables for configuration

**See:** `src/api/README.md`

### `/types`
Contains shared TypeScript type definitions used across the application.

**Key Points:**
- Global type definitions
- Domain models (MenuItem, Order, User, etc.)
- API response/request types
- Navigation param lists
- Utility types and interfaces

**Example Structure:**
```
types/
├── index.ts
├── menu.ts
├── order.ts
├── user.ts
└── api.ts
```

### `/utils`
Contains utility functions and helper functions.

**Key Points:**
- Pure functions with no side effects
- Organized by functionality
- Well-tested and documented
- Examples: formatters, validators, calculations, etc.

**Example Structure:**
```
utils/
├── index.ts
├── formatters.ts      # Format prices, dates, etc.
├── validators.ts      # Email, phone, etc.
├── calculations.ts    # Math operations
└── helpers.ts         # General helpers
```

### `/assets`
Contains static assets like images, colors, fonts, and constants.

**Key Points:**
- Organized by asset type
- Centralized color palette
- Font definitions
- Image assets
- App constants

**Example Structure:**
```
assets/
├── index.ts
├── colors.ts          # Color palette
├── fonts.ts           # Font definitions
├── images/            # Image files
├── icons/             # Icon files
└── constants.ts       # App-wide constants
```

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `Button.tsx`, `MenuCard.tsx`)
- **Screens**: PascalCase with "Screen" suffix (e.g., `HomeScreen.tsx`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`, `validateEmail.ts`)
- **Types**: camelCase or PascalCase for interfaces (e.g., `types.ts`, `MenuItem.ts`)
- **Constants**: UPPER_SNAKE_CASE for constants (e.g., `API_ENDPOINTS.ts`)

### Variables & Functions
- **Functions**: camelCase (e.g., `formatPrice()`, `validateEmail()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_ITEMS`)
- **Variables**: camelCase (e.g., `menuItems`, `isLoading`)
- **React Components**: PascalCase (e.g., `Button`, `MenuCard`)
- **Hooks**: camelCase with "use" prefix (e.g., `useMenu()`, `useOrder()`)

### Types & Interfaces
- **Interfaces**: PascalCase (e.g., `MenuItem`, `OrderState`)
- **Type aliases**: PascalCase (e.g., `MenuItemType`, `OrderStatus`)
- **Enums**: PascalCase (e.g., `OrderStatus`, `UserRole`)

## Import Organization

Organize imports in the following order:

1. React and React Native imports
2. Third-party library imports
3. Navigation imports
4. Store/Redux imports
5. Component imports
6. Type imports
7. Utility imports
8. Asset imports

**Example:**
```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Button } from '../components/common/Button';
import type { MenuItem } from '../types/menu';
import { formatPrice } from '../utils/formatters';
import { COLORS } from '../assets/colors';
```

## TypeScript Best Practices

1. **Always define types**: Use TypeScript interfaces for all props, state, and API responses
2. **Avoid `any`**: Use specific types instead of `any`
3. **Use `unknown` for dynamic values**: When type is truly unknown
4. **Export types**: Make types available for import in other files
5. **Use `type` for type aliases**: Use `type` keyword for type aliases, `interface` for object shapes
6. **Generic types**: Use generics for reusable components and functions

**Example:**
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, disabled, variant = 'primary' }) => {
  // Component implementation
};
```

## Code Organization Best Practices

1. **Keep files focused**: Each file should have a single responsibility
2. **Use barrel exports**: Use `index.ts` files to export public APIs
3. **Avoid circular dependencies**: Organize code to prevent circular imports
4. **Separate concerns**: Keep business logic separate from UI logic
5. **Use composition**: Build complex components from simpler ones
6. **Document complex logic**: Add comments and JSDoc for non-obvious code

## Testing Structure

Tests should be colocated with the code they test:

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
├── utils/
│   ├── formatPrice.ts
│   └── formatPrice.test.ts
```

## Environment Configuration

Use environment variables for configuration:

```
.env.local          # Local development
.env.development    # Development environment
.env.production     # Production environment
```

**Common variables:**
```
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_TIMEOUT=10000
REACT_APP_ENV=development
```

## Getting Started

1. Review the README in each directory for specific guidelines
2. Follow the naming conventions consistently
3. Use TypeScript for type safety
4. Keep components small and focused
5. Use the store for global state
6. Use the API layer for all backend communication
7. Organize imports properly
8. Document complex logic

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
