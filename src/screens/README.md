# Screens Directory

This directory contains all screen components for the React Native application.

## Structure

Each screen should be a self-contained component that represents a full-screen view in the application.

### Naming Convention

- Screen files should be named in PascalCase (e.g., `HomeScreen.tsx`, `MenuScreen.tsx`)
- Each screen should export a default component

### Example Structure

```
src/screens/
├── HomeScreen.tsx
├── MenuScreen.tsx
├── OrderScreen.tsx
└── ProfileScreen.tsx
```

## Best Practices

1. **Keep screens focused**: Each screen should handle one primary user flow
2. **Use navigation props**: Leverage React Navigation's `useNavigation` hook for navigation
3. **Extract complex logic**: Move complex business logic to custom hooks or store
4. **Reuse components**: Import and use components from `src/components/`
5. **Type safety**: Always use TypeScript interfaces for props and state

## Integration

Screens are typically registered in the navigation stack defined in `src/navigation/`.
