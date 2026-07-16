/**
 * API Endpoints Configuration
 * 
 * This module defines all API endpoint routes with typed request/response handlers.
 * Provides a centralized, type-safe way to make API calls.
 */

import { apiClient } from './client';
import {
  // Response types
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
  // Request types
  CreateOrderRequest,
  UpdateOrderRequest,
  AuthRequest,
  RegisterRequest,
  OrdersQueryParams,
  DonutsQueryParams,
} from '../types/api';

/**
 * API Endpoints namespace
 * Groups all API calls by domain/feature
 */
export const endpoints = {
  /**
   * Health & Status endpoints
   */
  health: {
    /**
     * Check API health status
     */
    check: async (): Promise<HealthCheckResponse> => {
      const response = await apiClient.get<HealthCheckResponse>('/health');
      return response.data;
    },
  },

  /**
   * Authentication endpoints
   */
  auth: {
    /**
     * Login with username and password
     */
    login: async (credentials: AuthRequest): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    },

    /**
     * Register a new user
     */
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      return response.data;
    },

    /**
     * Logout the current user
     */
    logout: async (): Promise<LogoutResponse> => {
      const response = await apiClient.post<LogoutResponse>('/auth/logout');
      return response.data;
    },

    /**
     * Get current user profile
     */
    getCurrentUser: async (): Promise<UserResponse> => {
      const response = await apiClient.get<UserResponse>('/auth/me');
      return response.data;
    },
  },

  /**
   * Donut endpoints
   */
  donuts: {
    /**
     * Get all donuts with pagination and filtering
     */
    getAll: async (params?: DonutsQueryParams): Promise<DonutsResponse> => {
      const response = await apiClient.get<DonutsResponse>('/donuts', { params });
      return response.data;
    },

    /**
     * Get a single donut by ID
     */
    getById: async (id: number): Promise<DonutResponse> => {
      const response = await apiClient.get<DonutResponse>(`/donuts/${id}`);
      return response.data;
    },

    /**
     * Get top donuts by sales
     */
    getTopSales: async (limit?: number): Promise<DonutSalesResponse> => {
      const response = await apiClient.get<DonutSalesResponse>('/donuts/sales/top', {
        params: { limit },
      });
      return response.data;
    },
  },

  /**
   * Order endpoints
   */
  orders: {
    /**
     * Get all orders with pagination and filtering
     */
    getAll: async (params?: OrdersQueryParams): Promise<OrdersResponse> => {
      const response = await apiClient.get<OrdersResponse>('/orders', { params });
      return response.data;
    },

    /**
     * Get a single order by ID
     */
    getById: async (id: string): Promise<OrderResponse> => {
      const response = await apiClient.get<OrderResponse>(`/orders/${id}`);
      return response.data;
    },

    /**
     * Create a new order
     */
    create: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
      const response = await apiClient.post<CreateOrderResponse>('/orders', data);
      return response.data;
    },

    /**
     * Update an existing order
     */
    update: async (id: string, data: UpdateOrderRequest): Promise<UpdateOrderResponse> => {
      const response = await apiClient.put<UpdateOrderResponse>(`/orders/${id}`, data);
      return response.data;
    },

    /**
     * Update order status
     */
    updateStatus: async (
      id: string,
      status: string
    ): Promise<UpdateOrderStatusResponse> => {
      const response = await apiClient.patch<UpdateOrderStatusResponse>(
        `/orders/${id}/status`,
        { status }
      );
      return response.data;
    },

    /**
     * Delete an order
     */
    delete: async (id: string): Promise<OrderResponse> => {
      const response = await apiClient.delete<OrderResponse>(`/orders/${id}`);
      return response.data;
    },

    /**
     * Get order summary
     */
    getSummary: async (id: string): Promise<OrderSummaryResponse> => {
      const response = await apiClient.get<OrderSummaryResponse>(`/orders/${id}/summary`);
      return response.data;
    },

    /**
     * Get order summaries with pagination
     */
    getSummaries: async (params?: OrdersQueryParams): Promise<OrderSummariesResponse> => {
      const response = await apiClient.get<OrderSummariesResponse>('/orders/summaries', {
        params,
      });
      return response.data;
    },
  },

  /**
   * City endpoints
   */
  cities: {
    /**
     * Get all cities
     */
    getAll: async (): Promise<CitiesResponse> => {
      const response = await apiClient.get<CitiesResponse>('/cities');
      return response.data;
    },

    /**
     * Get a single city by ID
     */
    getById: async (id: string): Promise<CityResponse> => {
      const response = await apiClient.get<CityResponse>(`/cities/${id}`);
      return response.data;
    },
  },

  /**
   * User endpoints
   */
  users: {
    /**
     * Get user profile
     */
    getProfile: async (): Promise<UserResponse> => {
      const response = await apiClient.get<UserResponse>('/users/profile');
      return response.data;
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: Partial<any>): Promise<UserResponse> => {
      const response = await apiClient.put<UserResponse>('/users/profile', data);
      return response.data;
    },
  },
};

/**
 * Export individual endpoint groups for convenience
 */
export const {
  health,
  auth,
  donuts,
  orders,
  cities,
  users,
} = endpoints;
