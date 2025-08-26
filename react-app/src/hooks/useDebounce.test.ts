import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('should update debounced value only after the delay', () => {
    let value = 'a';
    const { result, rerender } = renderHook(() => useDebounce(value, 300));

    expect(result.current).toBe('a'); // initial

    // change value
    value = 'b';
    rerender();

    // Still old value before delay
    expect(result.current).toBe('a');

    // Fast-forward less than delay
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('a');

    // After full delay, should update
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('b');
  });

  it('should reset the timer if value changes before delay finishes', () => {
    let value = 'start';
    const { result, rerender } = renderHook(() => useDebounce(value, 300));

    // Change value before delay ends
    value = 'mid';
    rerender();

    act(() => {
      jest.advanceTimersByTime(200); // not enough yet
    });
    expect(result.current).toBe('start'); // still old

    // Change again before 300ms finishes
    value = 'end';
    rerender();

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('end'); // latest value only
  });

  it('should clean up timers on unmount', () => {
    let value = 'test';
    const { unmount } = renderHook(() => useDebounce(value, 300));

    unmount();

    // Advance timers — no error should happen
    act(() => {
      jest.advanceTimersByTime(300);
    });
  });
});
