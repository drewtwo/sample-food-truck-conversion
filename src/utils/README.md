# Utils Directory

This directory contains utility functions, helpers, and custom hooks used throughout the application.

## Structure

Utilities are organized by purpose for easy discovery and reuse.

### Naming Convention

- Utility files should be named descriptively (e.g., `formatters.ts`, `validators.ts`, `helpers.ts`)
- Custom hooks should be prefixed with `use` (e.g., `useAsync.ts`, `useFetch.ts`)
- Utility functions should be named in camelCase

### Example Structure

```
src/utils/
├── formatters.ts
├── validators.ts
├── helpers.ts
├── constants.ts
├── useAsync.ts
├── useFetch.ts
└── useDebounce.ts
```

## Key Files

- **formatters.ts**: Functions for formatting data (dates, currency, etc.)
- **validators.ts**: Input validation functions
- **helpers.ts**: General-purpose helper functions
- **constants.ts**: Application-wide constants
- **useAsync.ts**: Custom hook for async operations
- **useFetch.ts**: Custom hook for API calls

## Best Practices

1. **Pure Functions**: Utility functions should be pure when possible
2. **Documentation**: Add JSDoc comments explaining purpose and usage
3. **Testing**: Utilities should be easily testable
4. **Reusability**: Create generic utilities for common patterns
5. **Performance**: Memoize custom hooks when appropriate
6. **Error Handling**: Include proper error handling in utilities

## Utility Template

```typescript
/**
 * Formats a date to a readable string
 * @param date - The date to format
 * @param format - The format string (default: 'MM/DD/YYYY')
 * @returns Formatted date string
 */
export const formatDate = (date: Date, format: string = 'MM/DD/YYYY'): string => {
  // Implementation
  return '';
};

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

## Custom Hook Template

```typescript
import { useState, useCallback } from 'react';

/**
 * Custom hook for managing async operations
 */
export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (err) {
      setError(err as Error);
      setStatus('error');
    }
  }, [asyncFunction]);

  return { execute, status, data, error };
};
```

## Integration

Utilities are imported and used throughout the application in components, screens, and services.
