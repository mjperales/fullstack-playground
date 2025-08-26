import { renderHook, act } from '@testing-library/react';
import useSWR from './useSWR';

describe('useSWR', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return loading initially and then data after fetch resolves', async () => {
    const mockFetcher = jest.fn(() => Promise.resolve({ id: 1, name: 'Test' }));

    const { result } = renderHook(() => useSWR('test-key', mockFetcher));

    // Initially: loading true, no data, no error
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the fetch to resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({ id: 1, name: 'Test' });
    expect(result.current.error).toBeNull();
  });

  it('should return cached data immediately if available', async () => {
    const mockFetcher = jest.fn(() =>
      Promise.resolve({ id: 2, name: 'Cached' })
    );

    // First render, populates cache
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderHook(() => useSWR('cache-key', mockFetcher));
      await Promise.resolve();
    });

    // Second render, should use cache without calling fetcher again
    const { result } = renderHook(() => useSWR('cache-key', mockFetcher));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({ id: 2, name: 'Cached' });
    expect(mockFetcher).toHaveBeenCalledTimes(1); // not called again
  });

  it('should handle fetch errors correctly', async () => {
    const mockError = new Error('Fetch failed');
    const mockFetcher = jest.fn(() => Promise.reject(mockError));

    const { result } = renderHook(() => useSWR('error-key', mockFetcher));

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    // Wait for error
    await act(async () => {
      try {
        await Promise.resolve();
      } catch {}
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeNull();
  });

  it('should not update state after unmount', async () => {
    const mockFetcher = jest.fn(
      () => new Promise((resolve) => setTimeout(() => resolve('late data'), 50))
    );

    const { result, unmount } = renderHook(() =>
      useSWR('unmount-key', mockFetcher)
    );

    expect(result.current.isLoading).toBe(true);

    unmount();

    // Resolve fetch after unmount
    await act(async () => {
      jest.advanceTimersByTime(60);
    });

    // Nothing should have updated after unmount
    expect(result.current.data).toBeNull();
  });
});
