import { useRef } from 'react';

interface IEventTracker {
  track: (eventName: string) => void;
  getCount: (eventName: string) => number;
}

export const useEventTracker = (): IEventTracker => {
  const initial = new Map();
  const referenceMap = useRef(initial);

  const handleTracking = (name: string) => {
    if (!referenceMap.current.has(name)) {
      referenceMap.current.set(name, 1);
      return;
    }

    let prevCount = referenceMap.current.get(name);
    referenceMap.current.set(name, ++prevCount);
  };

  const handleGetCount = (name: string) => {
    if (referenceMap.current.has(name)) {
      const currentCount = referenceMap.current.get(name);
      return currentCount;
    }
    return 0;
  };

  return { track: handleTracking, getCount: handleGetCount };
};
