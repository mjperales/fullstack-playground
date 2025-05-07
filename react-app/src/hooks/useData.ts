import { useState, useEffect } from 'react';

export interface DataInterface {
    id: string;
    name: string;
}

export const useData = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http:localhost:3001/api/item/1')
            .then((data) => data.json)
            .then((data) => setData(data))
            .then(() => setLoading(false))
            .catch(setError);
    }, []);

    return { data, loading, error };
};
