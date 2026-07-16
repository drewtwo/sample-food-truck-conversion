/**
 * Type definitions and models for the Food Truck application.
 * 
 * This module exports all TypeScript interfaces and types used throughout the application.
 * Types are organized into two main categories:
 * - models.ts: Core data models ported from FoodTruckKit
 * - api.ts: API request/response types
 */

// Core data models
export type {
  FlavorProfile,
  Ingredient,
  DonutDough,
  DonutGlaze,
  DonutTopping,
  Donut,
  Order,
  City,
  ParkingSpot,
  User,
  DonutSales,
  OrderSummary,
} from './models';

export { Flavor, OrderStatus, isAuthenticatedUser } from './models';

// API response types
export type {
  ApiResponse,
  PaginatedApiResponse,
  DonutResponse,
  DonutsResponse,
  OrderResponse,
  OrdersResponse,
  CreateOrderResponse,
  UpdateOrderResponse,
  UpdateOrderStatusResponse,
  CityResponse,
  CitiesResponse,
  UserResponse,
  AuthResponse,
  LogoutResponse,
  DonutSalesResponse,
  OrderSummaryResponse,
  OrderSummariesResponse,
  HealthCheckResponse,
  ErrorResponse,
  CreateOrderRequest,
  UpdateOrderRequest,
  AuthRequest,
  RegisterRequest,
  OrdersQueryParams,
  DonutsQueryParams,
} from './api';
