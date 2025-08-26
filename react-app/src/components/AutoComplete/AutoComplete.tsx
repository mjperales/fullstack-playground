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
  const fruits: { data: IFruit[] } = useSWR('/api/fruits', fetcher);
  const [data, setData] = useState(fruits.data || []);
  const [fruit, setFruit] = useState('');

  console.log(fruits);
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
      <ul>
        {data.map((fruit) => (
          <li>{fruit.name}</li>
        ))}
      </ul>
    </div>
  );
}
