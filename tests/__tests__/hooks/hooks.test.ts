/**
 * Custom Hooks Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { useAsync, useForm } from '../../src/hooks';

describe('Custom Hooks', () => {
  describe('useAsync', () => {
    it('handles successful async operation', async () => {
      const asyncFunction = jest.fn().mockResolvedValue({ data: 'test' });

      const { result } = renderHook(() => useAsync(asyncFunction, true));

      expect(result.current.loading).toBe(true);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ data: 'test' });
      expect(result.current.error).toBeNull();
    });

    it('handles async operation error', async () => {
      const error = new Error('Test error');
      const asyncFunction = jest.fn().mockRejectedValue(error);

      const { result } = renderHook(() => useAsync(asyncFunction, true));

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(error);
      expect(result.current.data).toBeNull();
    });

    it('does not execute immediately when immediate is false', () => {
      const asyncFunction = jest.fn();

      renderHook(() => useAsync(asyncFunction, false));

      expect(asyncFunction).not.toHaveBeenCalled();
    });
  });

  describe('useForm', () => {
    it('initializes with correct values', () => {
      const initialValues = { name: '', email: '' };

      const { result } = renderHook(() => useForm(initialValues));

      expect(result.current.values).toEqual(initialValues);
      expect(result.current.touched).toEqual({});
      expect(result.current.errors).toEqual({});
    });

    it('handles field changes', () => {
      const initialValues = { name: '', email: '' };

      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.handleChange('name', 'John');
      });

      expect(result.current.values.name).toBe('John');
    });

    it('handles field blur', () => {
      const initialValues = { name: '', email: '' };

      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.handleBlur('name');
      });

      expect(result.current.touched.name).toBe(true);
    });

    it('sets field errors', () => {
      const initialValues = { name: '', email: '' };

      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.setFieldError('name', 'Name is required');
      });

      expect(result.current.errors.name).toBe('Name is required');
    });

    it('resets form to initial values', () => {
      const initialValues = { name: '', email: '' };

      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.handleChange('name', 'John');
        result.current.handleBlur('name');
        result.current.setFieldError('name', 'Error');
      });

      act(() => {
        result.current.resetForm();
      });

      expect(result.current.values).toEqual(initialValues);
      expect(result.current.touched).toEqual({});
      expect(result.current.errors).toEqual({});
    });
  });
});
