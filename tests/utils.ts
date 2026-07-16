/**
 * Test Utilities
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';

/**
 * Custom render function with providers
 */
export const renderWithProviders = (
  component: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
  };

  return render(component, { wrapper: Wrapper, ...options });
};

/**
 * Mock API response
 */
export const mockApiResponse = <T,>(data: T, success = true) => ({
  success,
  data,
  error: success ? undefined : 'Error',
});

/**
 * Wait for async operations
 */
export const waitForAsync = () =>
  new Promise((resolve) => setTimeout(resolve, 0));
