import { useRef, useEffect } from 'react';
export default function usePrevious<T>(value: T): T | undefined {
  const previous = useRef<undefined | T>(undefined);

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
}
