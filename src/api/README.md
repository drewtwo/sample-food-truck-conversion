# API

This directory contains API client configuration, endpoints, and service functions for the Food Truck application.

## Structure

API logic is organized by feature/endpoint grouping.

### Naming Conventions

- Service files should be named descriptively (e.g., `menuService.ts`, `orderService.ts`)
- API client configuration should be in `client.ts`
- Constants should be in `constants.ts`
- Type files should be named `types.ts`

### File Organization

```
api/
├── client.ts
├── constants.ts
├── types.ts
├── services/
│   ├── menuService.ts
│   ├── orderService.ts
│   ├── userService.ts
│   ├── authService.ts
│   └── [other services]
└── interceptors/
    ├── errorHandler.ts
    └── [other interceptors]
```

## Best Practices

1. **Centralized Client**: Configure HTTP client (axios, fetch) in one place
2. **Service Layer**: Create service functions for each API endpoint
3. **Error Handling**: Implement consistent error handling
4. **Interceptors**: Use interceptors for auth tokens, logging, etc.
5. **Type Safety**: Define TypeScript types for all API requests/responses
6. **Base URL**: Use environment variables for API base URL
7. **Timeout**: Set appropriate timeout values

## Example API Client Setup

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  }
);
```

## Example Service Structure

```typescript
import { apiClient } from '../client';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const menuService = {
  getMenu: async (): Promise<MenuItem[]> => {
    const response = await apiClient.get('/menu');
    return response.data;
  },

  getMenuByCategory: async (category: string): Promise<MenuItem[]> => {
    const response = await apiClient.get(`/menu?category=${category}`);
    return response.data;
  },

  getMenuItem: async (id: string): Promise<MenuItem> => {
    const response = await apiClient.get(`/menu/${id}`);
    return response.data;
  },
};
```

## API Constants

Define API endpoints and constants in `constants.ts`:

```typescript
export const API_ENDPOINTS = {
  MENU: '/menu',
  ORDERS: '/orders',
  USERS: '/users',
  AUTH: '/auth',
};

export const API_TIMEOUT = 10000;
export const RETRY_ATTEMPTS = 3;
```

## Error Handling

Implement consistent error handling:

```typescript
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return new ApiError(
      error.response.status,
      error.response.data?.message || 'An error occurred',
      error.response.data
    );
  }
  return new ApiError(500, error.message || 'Network error');
};
```
