/**
 * Application Constants
 */

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const COLORS = {
  primary: '#FF6B35',
  secondary: '#004E89',
  success: '#06A77D',
  warning: '#F77F00',
  error: '#D62828',
  light: '#F5F5F5',
  dark: '#1A1A1A',
  white: '#FFFFFF',
  gray: '#808080',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  FAVORITES: 'favorites',
  RECENT_ORDERS: 'recent_orders',
} as const;
