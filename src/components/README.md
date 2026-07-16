# Components Directory

This directory contains reusable UI components for the React Native application.

## Structure

Components should be modular, reusable, and focused on a single responsibility.

### Naming Convention

- Component files should be named in PascalCase (e.g., `Button.tsx`, `Card.tsx`, `Header.tsx`)
- Each component should export a default component
- Related components can be grouped in subdirectories

### Example Structure

```
src/components/
├── Button.tsx
├── Card.tsx
├── Header.tsx
├── MenuItem.tsx
├── OrderItem.tsx
└── common/
    ├── Loader.tsx
    └── ErrorBoundary.tsx
```

## Best Practices

1. **Single Responsibility**: Each component should do one thing well
2. **Props Interface**: Define a TypeScript interface for all props
3. **Composition**: Build complex UIs by composing smaller components
4. **Styling**: Use StyleSheet from React Native for consistent styling
5. **Accessibility**: Include accessibility props (testID, accessibilityLabel, etc.)
6. **Documentation**: Add JSDoc comments for complex components

## Component Template

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface MyComponentProps {
  // Define props here
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  return (
    <View style={styles.container}>
      {/* Component content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyComponent;
```

## Integration

Components are imported and used in screens and other components throughout the application.
