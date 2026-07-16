# Types Directory

This directory contains all TypeScript type definitions and interfaces used throughout the application.

## Structure

Types are organized by domain/feature for better organization and discoverability.

### Naming Convention

- Type files should be named descriptively (e.g., `auth.ts`, `menu.ts`, `order.ts`)
- Use PascalCase for interface and type names
- Use UPPER_SNAKE_CASE for constants and enums

### Example Structure

```
src/types/
├── index.ts
├── auth.ts
├── menu.ts
├── order.ts
├── common.ts
└── api.ts
```

## Key Files

- **index.ts**: Central export file for all types
- **[domain].ts**: Types for each domain
- **common.ts**: Shared types used across domains
- **api.ts**: API-related types (responses, requests)

## Best Practices

1. **Centralized Exports**: Export all types from `index.ts`
2. **Domain Organization**: Group related types together
3. **Naming Clarity**: Use clear, descriptive names
4. **Documentation**: Add JSDoc comments for complex types
5. **Reusability**: Create generic types for common patterns
6. **Consistency**: Follow naming conventions across all files

## Type Template

```typescript
/**
 * Represents a user in the system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * Async state for loading data
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
```

## Integration

Types are imported throughout the application in components, screens, services, and store files.
