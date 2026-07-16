# Navigation

This directory contains navigation configuration and stack/tab navigators for the Food Truck application.

## Structure

Navigation is organized by navigator type and screen groupings.

### Naming Conventions

- Navigator files should be named descriptively (e.g., `RootNavigator.tsx`, `AuthNavigator.tsx`)
- Navigation types should be defined in `types.ts`
- Use TypeScript for type-safe navigation

### File Organization

```
navigation/
├── types.ts
├── RootNavigator.tsx
├── AuthNavigator.tsx
├── AppNavigator.tsx
└── [other navigators]
```

## Best Practices

1. **Centralized Navigation**: Keep all navigation logic in this directory
2. **Type Safety**: Define navigation param lists and screen names as types
3. **Deep Linking**: Configure deep linking for external navigation
4. **Navigation Props**: Pass navigation props correctly to screens
5. **Conditional Navigation**: Handle authenticated vs. unauthenticated states

## Navigation Structure

### Root Navigator
The top-level navigator that handles authentication state and switches between auth and app navigators.

### Auth Navigator
Handles login, registration, and password reset screens.

### App Navigator
Main application navigator with tab or stack navigation for authenticated users.

## Example Navigation Setup

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
```

## Type Definitions

Define your navigation param lists in `types.ts`:

```typescript
export type RootStackParamList = {
  Home: undefined;
  Menu: { category?: string };
  Order: { items: MenuItem[] };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};
```
