import { useState, useEffect } from 'react';

export interface DataInterface {
    id: string;
    name: string;
}

export const useData = (url: string) => {
    const [data, setData] = useState<DataInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
            } catch (err) {
                setError(err);
            }
        };
    }, [url]);

    return { data, loading, error };
};
