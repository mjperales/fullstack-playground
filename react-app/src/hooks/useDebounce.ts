import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number) {
  const [data, setData] = useState(value);

  useEffect(() => {
    let mounted = true;

    const timer = setTimeout(() => {
      if (mounted) {
        setData(value);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return data;
}
