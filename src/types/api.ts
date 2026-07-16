/**
 * API response types for the Food Truck application.
 * These types define the structure of responses from backend API endpoints.
 */

import type {
  Donut,
  Order,
  City,
  User,
  OrderStatus,
  DonutSales,
  OrderSummary,
} from './models';

/**
 * Generic API response wrapper.
 * All API responses follow this structure.
 */
export interface ApiResponse<T> {
  /** Whether the request was successful */
  success: boolean;
  /** Response data payload */
  data?: T;
  /** Error message if the request failed */
  error?: string;
  /** HTTP status code */
  statusCode: number;
  /** Timestamp of the response */
  timestamp: string;
}

/**
 * Paginated API response wrapper.
 * Used for endpoints that return collections of data.
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  /** Total number of items available */
  total: number;
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there are more pages available */
  hasMore: boolean;
}

/**
 * Response for fetching a single donut.
 */
export type DonutResponse = ApiResponse<Donut>;

/**
 * Response for fetching multiple donuts.
 */
export type DonutsResponse = PaginatedApiResponse<Donut>;

/**
 * Response for fetching a single order.
 */
export type OrderResponse = ApiResponse<Order>;

/**
 * Response for fetching multiple orders.
 */
export type OrdersResponse = PaginatedApiResponse<Order>;

/**
 * Response for creating a new order.
 */
export type CreateOrderResponse = ApiResponse<Order>;

/**
 * Response for updating an order.
 */
export type UpdateOrderResponse = ApiResponse<Order>;

/**
 * Response for updating order status.
 */
export interface UpdateOrderStatusResponse extends ApiResponse<Order> {
  /** Previous status before the update */
  previousStatus?: OrderStatus;
  /** New status after the update */
  newStatus?: OrderStatus;
}

/**
 * Response for fetching a single city.
 */
export type CityResponse = ApiResponse<City>;

/**
 * Response for fetching multiple cities.
 */
export type CitiesResponse = ApiResponse<City[]>;

/**
 * Response for fetching user information.
 */
export type UserResponse = ApiResponse<User>;

/**
 * Response for user authentication.
 */
export interface AuthResponse extends ApiResponse<User> {
  /** Authentication token for subsequent requests */
  token?: string;
  /** Token expiration time in seconds */
  expiresIn?: number;
}

/**
 * Response for user logout.
 */
export type LogoutResponse = ApiResponse<null>;

/**
 * Response for fetching donut sales data.
 */
export type DonutSalesResponse = ApiResponse<DonutSales[]>;

/**
 * Response for fetching order summary.
 */
export type OrderSummaryResponse = ApiResponse<OrderSummary>;

/**
 * Response for fetching multiple order summaries.
 */
export type OrderSummariesResponse = PaginatedApiResponse<OrderSummary>;

/**
 * Response for health check endpoint.
 */
export interface HealthCheckResponse extends ApiResponse<null> {
  /** Service version */
  version?: string;
  /** Service uptime in seconds */
  uptime?: number;
}

/**
 * Error response structure.
 * Provides detailed error information for failed requests.
 */
export interface ErrorResponse extends ApiResponse<null> {
  /** Specific error code for programmatic handling */
  errorCode?: string;
  /** Array of validation errors (if applicable) */
  validationErrors?: Array<{
    field: string;
    message: string;
  }>;
  /** Stack trace for debugging (only in development) */
  stackTrace?: string;
}

/**
 * Request payload for creating an order.
 */
export interface CreateOrderRequest {
  /** Array of donut IDs to include in the order */
  donutIds: number[];
  /** Sales count per donut ID */
  sales: Record<number, number>;
  /** City ID where the order should be fulfilled */
  city: string;
  /** Parking spot ID where the order should be fulfilled */
  parkingSpot: string;
  /** Current temperature */
  temperature: {
    value: number;
    unit: 'celsius' | 'fahrenheit';
  };
  /** Whether it's currently raining */
  wasRaining: boolean;
}

/**
 * Request payload for updating an order.
 */
export interface UpdateOrderRequest {
  /** New status for the order */
  status?: OrderStatus;
  /** Updated sales data */
  sales?: Record<number, number>;
  /** Updated grand total */
  grandTotal?: number;
}

/**
 * Request payload for user authentication.
 */
export interface AuthRequest {
  /** Username or email */
  username: string;
  /** User password */
  password: string;
}

/**
 * Request payload for user registration.
 */
export interface RegisterRequest {
  /** Username for the new account */
  username: string;
  /** Email address for the new account */
  email: string;
  /** Password for the new account */
  password: string;
  /** Password confirmation */
  passwordConfirm: string;
}

/**
 * Query parameters for fetching orders.
 */
export interface OrdersQueryParams {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Filter by order status */
  status?: OrderStatus;
  /** Filter by city ID */
  city?: string;
  /** Sort field */
  sortBy?: 'creationDate' | 'grandTotal' | 'status';
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
  /** Search query for order ID or donut names */
  search?: string;
}

/**
 * Query parameters for fetching donuts.
 */
export interface DonutsQueryParams {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Filter by dough type */
  dough?: string;
  /** Filter by glaze type */
  glaze?: string;
  /** Filter by topping type */
  topping?: string;
  /** Search query for donut name or ingredients */
  search?: string;
}
