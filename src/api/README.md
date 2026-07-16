# API Directory

This directory contains all API client configuration and service functions.

## Structure

API services are organized by domain/feature for better maintainability.

### Naming Convention

- API service files should be named descriptively (e.g., `authService.ts`, `menuService.ts`)
- Each service exports functions for API calls
- Client configuration is in `client.ts`

### Example Structure

```
src/api/
├── client.ts
├── authService.ts
├── menuService.ts
├── orderService.ts
└── types.ts
```

## Key Files

- **client.ts**: HTTP client setup (axios, fetch, etc.)
- **[domain]Service.ts**: API functions for each domain
- **types.ts**: TypeScript types for API responses

## Best Practices

1. **Centralized Client**: Use a single HTTP client instance
2. **Error Handling**: Implement consistent error handling
3. **Request/Response Interceptors**: Add auth tokens, logging, etc.
4. **Type Safety**: Define interfaces for all API responses
5. **Service Functions**: Export pure functions that return promises
6. **Base URL**: Configure base URL from environment variables

## Service Template

```typescript
import { apiClient } from './client';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export const menuService = {
  getMenu: async (): Promise<MenuItem[]> => {
    const response = await apiClient.get('/menu');
    return response.data;
  },

  getMenuItem: async (id: string): Promise<MenuItem> => {
    const response = await apiClient.get(`/menu/${id}`);
    return response.data;
  },
};
```

## Integration

API services are typically called from Redux async thunks or directly in components via custom hooks.
