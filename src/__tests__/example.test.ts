/**
 * Example test to verify Jest and React Native Testing Library setup
 */

describe('Jest Setup Verification', () => {
  it('should have Jest configured correctly', () => {
    expect(true).toBe(true);
  });

  it('should have access to jest globals', () => {
    expect(jest).toBeDefined();
    expect(jest.fn).toBeDefined();
  });

  it('should be able to create mock functions', () => {
    const mockFn = jest.fn();
    mockFn('test');
    expect(mockFn).toHaveBeenCalledWith('test');
  });
});
