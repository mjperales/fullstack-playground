import { renderHook, act } from '@testing-library/react';
import { useEventTracker } from './useEventTracker';

describe('useEventTracker', () => {
  it('should start with count 0 for any event', () => {
    const { result } = renderHook(() => useEventTracker());

    expect(result.current.getCount('click')).toBe(0);
    expect(result.current.getCount('hover')).toBe(0);
  });

  it('should increment count for an event when track is called', () => {
    const { result } = renderHook(() => useEventTracker());

    act(() => {
      result.current.track('click');
      result.current.track('click');
      result.current.track('hover');
    });

    expect(result.current.getCount('click')).toBe(2);
    expect(result.current.getCount('hover')).toBe(1);
  });

  it('should keep independent counts for different events', () => {
    const { result } = renderHook(() => useEventTracker());

    act(() => {
      result.current.track('scroll');
      result.current.track('scroll');
      result.current.track('hover');
    });

    expect(result.current.getCount('scroll')).toBe(2);
    expect(result.current.getCount('hover')).toBe(1);
    expect(result.current.getCount('click')).toBe(0);
  });

  it('should persist counts across rerenders', () => {
    const { result, rerender } = renderHook(() => useEventTracker());

    act(() => {
      result.current.track('click');
    });

    rerender();

    expect(result.current.getCount('click')).toBe(1);
  });
});
