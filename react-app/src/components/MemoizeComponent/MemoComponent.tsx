import React, { useEffect, useState, memo } from 'react';

function MemoChild({ onIncrement, count }: { onIncrement: () => void, count: number }) {
    const [renderCount, setCount] = useState(1);
    useEffect(() => {
        if(count > 0) {
            setCount((prevCount) => prevCount + 1);
        }
    },[count]);
    return (
      <div>
        <div data-testid="child-render-count">
          Child rendered: {renderCount} times
        </div>
        <button data-testid="child-increment-button" onClick={onIncrement}>
          Increment from child
        </button>
      </div>
    );
  }

export default memo(MemoChild);