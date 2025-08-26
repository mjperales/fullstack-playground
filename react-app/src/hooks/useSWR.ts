import { useState, useEffect } from 'react';

export interface UseSWRResponse {
  data: any;
  isLoading: boolean;
  error: any;
}

interface IKeys {
  [i: string]: {
    data: any;
  };
}

let cache: IKeys = {};

export default function useSWR(key: string, fetcher: () => Promise<any>): UseSWRResponse {
  // TODO: Implement the hook.
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!cache[key]);

  useEffect(() => {
    let mounted = true;
    if (!key) return;

    // if cached, return immediately
    if (cache[key]) {
      setData(cache[key]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    fetcher()
      .then((res) => {
        console.log('res', res);
        if (mounted) {
          cache[key] = res;
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    // clean up
    return () => {
      mounted = false;
    };
  }, [key, fetcher]);

  return {
    data,
    isLoading,
    error,
  };
}
