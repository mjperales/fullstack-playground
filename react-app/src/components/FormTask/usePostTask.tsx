import React, { useEffect, useState } from 'react';

interface DataInterface {
    input: {
        id: string;
        task: string;
    }
}

export const usePostTask = async ({ input } : DataInterface) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<DataInterface | null>(null);

    useEffect(() => {
        const postTask = async (task: {id: string; task: string;}) => {
            try {
                const res = await fetch('http://localhost:3001/api/tasks/create/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(task)
                });

                if(!res.ok) {
                    throw new Error('Oops, something went wrong while creating');
                }

                const data = await res.json();
                setData(data.task.task);
                setLoading(false);

            } catch(error: unknown) {
                setLoading(false);
                if(error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            }
        };
        postTask(input);

        // cleanup
        return () => {
            setLoading(true);
            setError(null);
            setData(null);
        };

    }, [input]);

    return { loading, data, error };

};