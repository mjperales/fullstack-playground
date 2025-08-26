import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useSWR from '../../hooks/useSWR';

interface IFruit {
  id: number;
  name: string;
  emoji: string;
}

export default function AutoComplete() {
  const fetcher = async () => {
    return fetch('http://localhost:3001/api/fruits').then((res) => res.json());
  };
  const {
    data,
    error,
    isLoading,
  }: { data: IFruit[]; error: string | null; isLoading: boolean } = useSWR(
    '/api/fruits',
    fetcher
  );
  const [fruits, setFruits] = useState(data || []);
  const [fruit, setFruit] = useState('');

  return (
    <div>
      <form>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          onChange={(e) => {
            setFruit(e.target.value);
          }}
          id="search"
          value={fruit}
          name="search"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      <ul>{!isLoading && data.map((fruit) => <li>{fruit.name}</li>)}</ul>
    </div>
  );
}
