/**
 * API Client Configuration
 * 
 * This module sets up the axios HTTP client with:
 * - Base URL from environment configuration
 * - Request/response interceptors for auth tokens
 * - Error handling and logging
 * - Request timeout configuration
 */

import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse, ApiResponse } from '../types/api';

/**
 * Get the API base URL from environment variables
 */
const getApiBaseUrl = (): string => {
  // Try different environment variable names for compatibility
  const baseUrl =
    process.env.REACT_APP_API_URL ||
    process.env.EXPO_PUBLIC_API_URL ||
    process.env.API_URL ||
    'http://localhost:3000/api';

  return baseUrl;
};

/**
 * Create and configure the axios instance
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 30000, // 30 seconds
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  /**
   * Request interceptor: Add auth token to requests
   */
  client.interceptors.request.use(
    (config) => {
      // Get auth token from storage (if available)
      // In a real app, you'd retrieve this from AsyncStorage or similar
      const token = getAuthToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * Response interceptor: Handle errors and token refresh
   */
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // Handle 401 Unauthorized - token may have expired
      if (error.response?.status === 401) {
        // Clear auth token and redirect to login
        clearAuthToken();
        // In a real app, you'd dispatch a logout action or navigate to login
        console.warn('Authentication token expired or invalid');
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.warn('Access forbidden');
      }

      // Handle 500 Server Error
      if (error.response?.status === 500) {
        console.error('Server error occurred');
      }

      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Initialize the API client
 */
export const apiClient: AxiosInstance = createApiClient();

/**
 * Helper function to get auth token
 * In a real app, this would retrieve from secure storage
 */
const getAuthToken = (): string | null => {
  // Placeholder: In production, retrieve from AsyncStorage or similar
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  // return await AsyncStorage.getItem('authToken');
  return null;
};

/**
 * Helper function to clear auth token
 * In a real app, this would remove from secure storage
 */
const clearAuthToken = (): void => {
  // Placeholder: In production, clear from AsyncStorage or similar
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  // await AsyncStorage.removeItem('authToken');
};

/**
 * Helper function to set auth token
 * In a real app, this would store in secure storage
 */
export const setAuthToken = (token: string): void => {
  // Placeholder: In production, store in AsyncStorage or similar
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  // await AsyncStorage.setItem('authToken', token);
};

/**
 * Type guard to check if error is an API error response
 */
export const isApiError = (error: unknown): error is AxiosError<ErrorResponse> => {
  return axios.isAxiosError(error) && error.response?.data?.success === false;
};

/**
 * Extract error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.response?.data?.error || 'An error occurred';
  }

  if (axios.isAxiosError(error)) {
    if (error.message === 'Network Error') {
      return 'Network error. Please check your connection.';
    }
    if (error.code === 'ECONNABORTED') {
      return 'Request timeout. Please try again.';
    }
    return error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
};

/**
 * Export axios for direct use if needed
 */
export { axios };
