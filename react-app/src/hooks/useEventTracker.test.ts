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
  it('should return an empty array if no events tracked', () => {
    const { result } = renderHook(() => useEventTracker());
    expect(result.current.getLeaderboard()).toEqual([]);
  });

  it('should return events sorted by count descending', () => {
    const { result } = renderHook(() => useEventTracker());

    act(() => {
      result.current.track('click');
      result.current.track('hover');
      result.current.track('click');
      result.current.track('scroll');
      result.current.track('scroll');
      result.current.track('scroll');
    });

    const leaderboard = result.current.getLeaderboard();
    expect(leaderboard).toEqual([
      ['scroll', 3],
      ['click', 2],
      ['hover', 1],
    ]);
  });

  it('should limit results when topN is provided', () => {
    const { result } = renderHook(() => useEventTracker());

    act(() => {
      result.current.track('a');
      result.current.track('b');
      result.current.track('a');
      result.current.track('c');
      result.current.track('b');
      result.current.track('b');
    });

    const top2 = result.current.getLeaderboard(2);
    expect(top2).toEqual([
      ['b', 3],
      ['a', 2],
    ]);
  });
});
