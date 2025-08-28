import { useRef, useMemo, useState } from 'react';

interface IEventTracker {
  track: (eventName: string) => void;
  getCount: (eventName: string) => number;
  getLeaderboard: (topN?: number) => (string | number)[][] | [];
}

export const useEventTracker = (): IEventTracker => {
  const [version, setVersion] = useState(0);
  const initial = new Map();
  const referenceMap = useRef(initial);
  const memoSort = useMemo(
    () => Array.from(referenceMap.current).sort((a, b) => b[1] - a[1]),
    [version]
  );

  const handleTracking = (name: string) => {
    const prevCount = referenceMap.current.get(name) ?? 0;
    referenceMap.current.set(name, prevCount + 1);
    setVersion(version + 1);
  };

  const handleGetCount = (name: string) => {
    return referenceMap.current.get(name) ?? 0;
  };

  const handleLeaderboard = (topN?: number) => {
    if (referenceMap.current.size <= 0) {
      return [];
    }

    return topN ? memoSort.slice(0, topN) : memoSort;
  };

  return {
    track: handleTracking,
    getCount: handleGetCount,
    getLeaderboard: handleLeaderboard,
  };
};
