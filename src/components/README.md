# Components

This directory contains reusable UI components for the Food Truck application.

## Structure

Components are organized by functionality and can be used across multiple screens.

### Naming Conventions

- Component files should be named in PascalCase (e.g., `Button.tsx`, `MenuCard.tsx`)
- Each component should export a default component
- Components should be functional components using React hooks
- Create a `types.ts` file in subdirectories for component-specific types

### File Organization

```
components/
├── common/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── types.ts
├── menu/
│   ├── MenuCard.tsx
│   ├── MenuList.tsx
│   └── types.ts
├── order/
│   ├── OrderItem.tsx
│   ├── OrderSummary.tsx
│   └── types.ts
└── [other component groups]
```

## Best Practices

1. **Single Responsibility**: Each component should have one primary purpose
2. **Reusability**: Design components to be flexible and reusable across the app
3. **Props Interface**: Define clear TypeScript interfaces for component props
4. **Styling**: Use consistent styling approach (StyleSheet, styled-components, etc.)
5. **Documentation**: Add JSDoc comments for complex components
6. **Testing**: Components should be easy to test in isolation

## Component Categories

### Common Components
Basic UI elements used throughout the app (buttons, cards, headers, etc.)

### Feature-Specific Components
Components grouped by feature (menu, order, payment, etc.)

## Example Component Structure

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

/**
 * A reusable button component
 */
export const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <View style={[styles.button, disabled && styles.disabled]}>
      <Text onPress={onPress}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
```
