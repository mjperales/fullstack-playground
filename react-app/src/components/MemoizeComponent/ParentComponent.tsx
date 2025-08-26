import React, { useState, useCallback } from 'react';
import MemoChild from './MemoComponent';

function ParentComponent() {
    const [count, setCount] = useState(0);
    const [, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    const handleIncrement = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
    }, []);

  return (
    <div data-testid="use-callback-container">
      <h1>useCallback Challenge</h1>
      <div>
        <p data-testid="parent-count">Count: {count}</p>
        <button onClick={handleIncrement} data-testid="increment-button">
          Increment
        </button>
      </div>
      <div>
        <input
          data-testid="text-input"
          type="text"
          placeholder="Type something..."
          onChange={handleChange}
        />
      </div>

      {/* This is where we'll use the MemoChild */}
      <MemoChild count={count} onIncrement={handleIncrement} />
    </div>
  );
}

export default ParentComponent;