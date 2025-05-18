import React, { useState } from 'react';

const Form = () => {
    const [task, setTask] = useState('');
    const [added, setAdded] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/tasks/create/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({id: '665', task: task})
            });

            if(!res.ok) {
                throw new Error('Oops, something went wrong while creating');
            }

            const data = await res.json();
            setAdded(data.task.task);

        } catch(error: unknown) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        }
    };

    return (
        <React.Fragment>
            <h1>Add a task</h1>
            {added && <p>Item Successfully added: {added}</p>}
            <form onSubmit={handleSubmit}>
                <label>Task name</label>
                <input type='text' name='task' id='task' onChange={handleChange}></input>
                <button type="submit">Submit</button>
            </form>
            {error != null && <p>Oops, something went wrong {error}</p>}
        </React.Fragment>
    );
};

export default Form;