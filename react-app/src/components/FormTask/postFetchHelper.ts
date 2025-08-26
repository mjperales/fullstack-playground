export const postFetchHelper = async (input: { id: string; task: string }) => {
  try {
    const res = await fetch('http://localhost:3001/api/tasks/create/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      throw new Error('Oops, response returned with an error');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return String(error);
    }
  }
};
