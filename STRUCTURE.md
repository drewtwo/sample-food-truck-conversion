# Project Structure Documentation

## Overview

This document describes the structure and organization of the Food Truck React Native application.

## Directory Structure

```
food-truck-rn/
├── src/                          # Source code
│   ├── components/               # Reusable UI components
│   │   └── Button.tsx           # Example button component
│   ├── screens/                 # Screen components
│   │   └── HomeScreen.tsx       # Home screen
│   ├── services/                # External services and API
│   │   └── api.ts              # API service layer
│   ├── hooks/                   # Custom React hooks
│   │   └── index.ts            # useAsync, useForm hooks
│   ├── utils/                   # Utility functions
│   │   └── index.ts            # Helper functions
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts            # App-wide types
│   └── constants/               # Application constants
│       └── index.ts            # Colors, spacing, etc.
├── tests/                        # Test files
│   ├── __tests__/               # Test suites
│   │   ├── components/          # Component tests
│   │   ├── services/            # Service tests
│   │   ├── hooks/               # Hook tests
│   │   ├── screens/             # Screen tests
│   │   └── utils/               # Utility tests
│   ├── setup.ts                 # Jest setup
│   └── utils.ts                 # Test utilities
├── App.tsx                       # Root component
├── index.js                      # Entry point
├── app.json                      # Expo app config
├── expo.json                     # Expo config
├── tsconfig.json                 # TypeScript config
├── jest.config.js                # Jest config
├── babel.config.js               # Babel config
├── metro.config.js               # Metro bundler config
├── .eslintrc.json                # ESLint config
├── .prettierrc.json              # Prettier config
├── .prettierignore               # Prettier ignore
├── .gitignore                    # Git ignore
├── .env.example                  # Environment variables example
├── package.json                  # Dependencies
└── README.md                     # Project README
```

## Key Directories

### `/src/components`
Reusable UI components that are used across multiple screens.

**Example:**
- `Button.tsx` - Customizable button component with variants

**Guidelines:**
- Each component should be self-contained
- Use TypeScript interfaces for props
- Include JSDoc comments
- Keep components focused and single-responsibility

### `/src/screens`
Full-screen components that represent different app views.

**Example:**
- `HomeScreen.tsx` - Main home screen

**Guidelines:**
- One screen per file
- Use meaningful names with "Screen" suffix
- Handle navigation logic
- Compose smaller components

### `/src/services`
External service integrations and API communication.

**Example:**
- `api.ts` - HTTP client for API calls

**Guidelines:**
- Encapsulate external service logic
- Handle authentication
- Provide typed responses
- Include error handling

### `/src/hooks`
Custom React hooks for shared logic.

**Example:**
- `useAsync` - Handle async operations
- `useForm` - Manage form state

**Guidelines:**
- Prefix with "use"
- Keep logic reusable
- Include TypeScript types
- Document with JSDoc

### `/src/utils`
Pure utility functions and helpers.

**Example:**
- `formatCurrency` - Format numbers as currency
- `calculateDistance` - Calculate distance between coordinates

**Guidelines:**
- Pure functions (no side effects)
- Well-documented
- Thoroughly tested
- Reusable across the app

### `/src/types`
TypeScript type definitions and interfaces.

**Guidelines:**
- Centralized type definitions
- Use interfaces for objects
- Use types for unions and complex types
- Export all types from index.ts

### `/src/constants`
Application-wide constants.

**Guidelines:**
- Colors, spacing, font sizes
- API endpoints
- Storage keys
- Feature flags

### `/tests`
Test files organized by type.

**Structure:**
- `__tests__/components/` - Component tests
- `__tests__/services/` - Service tests
- `__tests__/hooks/` - Hook tests
- `__tests__/screens/` - Screen tests
- `__tests__/utils/` - Utility tests

**Guidelines:**
- Mirror src/ structure
- Use `.test.ts` or `.test.tsx` suffix
- Include setup.ts for Jest configuration
- Use utils.ts for test helpers

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `HomeScreen.tsx`)
- **Utilities**: camelCase (e.g., `formatCurrency.ts`)
- **Types**: PascalCase (e.g., `User.ts`)
- **Tests**: Same as source + `.test` (e.g., `Button.test.tsx`)
- **Constants**: camelCase (e.g., `colors.ts`)

## Import Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of:
import { Button } from '../../../components/Button';

// Use:
import { Button } from '@components/Button';
```

**Available aliases:**
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@screens/*` → `src/screens/*`
- `@services/*` → `src/services/*`
- `@utils/*` → `src/utils/*`
- `@types/*` → `src/types/*`
- `@hooks/*` → `src/hooks/*`
- `@constants/*` → `src/constants/*`

## Configuration Files

### `tsconfig.json`
TypeScript compiler options and path aliases.

### `jest.config.js`
Jest testing framework configuration.

### `babel.config.js`
Babel transpiler configuration with module resolver.

### `.eslintrc.json`
ESLint rules and configuration.

### `.prettierrc.json`
Code formatting rules.

### `app.json` & `expo.json`
Expo application configuration.

### `metro.config.js`
React Native Metro bundler configuration.

## Development Workflow

1. **Create a new component:**
   ```
   src/components/MyComponent.tsx
   tests/__tests__/components/MyComponent.test.tsx
   ```

2. **Create a new screen:**
   ```
   src/screens/MyScreen.tsx
   tests/__tests__/screens/MyScreen.test.tsx
   ```

3. **Add a utility function:**
   ```
   src/utils/myUtil.ts
   tests/__tests__/utils/myUtil.test.ts
   ```

4. **Add a custom hook:**
   ```
   src/hooks/useMyHook.ts
   tests/__tests__/hooks/useMyHook.test.ts
   ```

## Best Practices

1. **Type Safety**: Always use TypeScript types
2. **Testing**: Write tests for all utilities and services
3. **Documentation**: Include JSDoc comments for public APIs
4. **Code Organization**: Keep related code together
5. **Reusability**: Extract common logic into utilities and hooks
6. **Performance**: Use React.memo for expensive components
7. **Accessibility**: Follow React Native accessibility guidelines
8. **Error Handling**: Implement proper error handling in services

## Adding New Features

1. Create necessary components in `/src/components`
2. Create screens in `/src/screens`
3. Add types to `/src/types/index.ts`
4. Add constants to `/src/constants/index.ts`
5. Create services in `/src/services` if needed
6. Create custom hooks in `/src/hooks` if needed
7. Write tests for all new code
8. Update this documentation if needed
