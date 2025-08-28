import { useEffect, useState } from 'react';

export function useFetch(url: string) {
  const [data, setData] = useState([]);
  const [error, setError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rsp = await fetch(url);

        if (!rsp.ok) {
          console.error('fetchData returned NOT OK response');
          setError(rsp.statusText);
        }
        const data = await rsp.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      }
    };

    fetchData();

    // clean up
    return () => {
      setData([]);
      setError(false);
      setLoading(true);
    };
  }, [url]);

  return { data, error, loading };
}
