import { renderHook } from '@testing-library/react';
import usePrevious from './usePrevious';

describe('usePrevious', () => {
  it('should return undefined on initial render', () => {
    const { result } = renderHook(() => usePrevious(42));
    expect(result.current).toBeUndefined();
  });

  it('should return the previous value after rerender', () => {
    let value = 1;
    const { result, rerender } = renderHook(() => usePrevious(value));

    expect(result.current).toBeUndefined(); // first render

    value = 2;
    rerender();
    expect(result.current).toBe(1); // previous value

    value = 3;
    rerender();
    expect(result.current).toBe(2); // previous value again
  });

  it('should update correctly when value is a string', () => {
    let value = 'hello';
    const { result, rerender } = renderHook(() => usePrevious(value));

    expect(result.current).toBeUndefined();

    value = 'world';
    rerender();
    expect(result.current).toBe('hello');

    value = 'again';
    rerender();
    expect(result.current).toBe('world');
  });

  it('should handle objects by reference', () => {
    let value = { id: 1 };
    const { result, rerender } = renderHook(() => usePrevious(value));

    expect(result.current).toBeUndefined();

    value = { id: 2 };
    rerender();
    expect(result.current).toEqual({ id: 1 });
  });
});
