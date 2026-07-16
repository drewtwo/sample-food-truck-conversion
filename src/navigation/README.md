# Navigation Directory

This directory contains all navigation-related configuration and setup for React Navigation.

## Structure

Navigation files organize the app's routing and screen stack management.

### Naming Convention

- Navigation files should be named descriptively (e.g., `RootNavigator.tsx`, `AuthStack.tsx`)
- Each navigator should be a separate component or configuration

### Example Structure

```
src/navigation/
├── RootNavigator.tsx
├── AuthStack.tsx
├── AppStack.tsx
├── types.ts
└── linking.ts
```

## Key Files

- **RootNavigator.tsx**: Main entry point for navigation, handles auth state
- **AuthStack.tsx**: Navigation stack for unauthenticated users
- **AppStack.tsx**: Navigation stack for authenticated users
- **types.ts**: TypeScript types for navigation params
- **linking.ts**: Deep linking configuration

## Best Practices

1. **Separate Stacks**: Keep auth and app navigation separate
2. **Type Safety**: Define navigation param types in `types.ts`
3. **Deep Linking**: Configure deep linking for external URLs
4. **Navigation Props**: Use `useNavigation` and `useRoute` hooks
5. **Screen Options**: Define consistent screen options (headers, transitions)

## Navigation Types Example

```typescript
export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Profile: { userId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
```

## Integration

The RootNavigator is typically rendered at the top level of the app in `App.tsx`.
