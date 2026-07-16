# Screens

This directory contains all screen components for the Food Truck application.

## Structure

Each screen should be a self-contained component that represents a full page or major view in the application.

### Naming Conventions

- Screen files should be named in PascalCase (e.g., `HomeScreen.tsx`, `MenuScreen.tsx`)
- Each screen should export a default component
- Screen components should be functional components using React hooks

### File Organization

```
screens/
├── HomeScreen.tsx
├── MenuScreen.tsx
├── OrderScreen.tsx
├── ProfileScreen.tsx
└── [other screens]
```

## Best Practices

1. **Keep screens focused**: Each screen should handle one primary view/feature
2. **Use composition**: Break down complex screens into smaller components from `src/components/`
3. **Navigation props**: Screens receive navigation props from React Navigation
4. **State management**: Use Redux/store for global state, local state for UI-specific state
5. **Type safety**: Always define proper TypeScript types for props and state

## Example Screen Structure

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
```
