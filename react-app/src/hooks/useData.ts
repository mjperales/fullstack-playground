import { useState, useEffect } from 'react';

export interface DataInterface {
    id: string;
    name: string;
}

export const useData = (url: string) => {
    const [data, setData] = useState<DataInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    console.error(res.statusText);
                    throw new Error('Network response was not ok');
                }

                const result = await res.json();
                setData(result);
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            }
        };

        fetchData();

        return () => {
            setData(null);
            setLoading(true);
            setError(null);
        };
    }, [url]);

    return { data, loading, error };
};
