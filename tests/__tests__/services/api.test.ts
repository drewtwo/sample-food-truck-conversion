/**
 * API Service Tests
 */

import { apiService } from '../../src/services/api';

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('GET request', () => {
    it('makes a successful GET request', async () => {
      const mockData = { id: 1, name: 'Test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await apiService.get('/test');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('handles GET request error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      const result = await apiService.get('/test');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('POST request', () => {
    it('makes a successful POST request', async () => {
      const mockData = { id: 1, name: 'Created' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await apiService.post('/test', { name: 'Test' });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('Token management', () => {
    it('sets and uses token in requests', async () => {
      apiService.setToken('test-token');
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await apiService.get('/test');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });
  });
});
