import React, {useState} from 'react';
// TODO: Attach a single click event listener to the container below
// TODO: When an item is clicked, display its text in the "result" area
// Hint: You might need state to track the clicked item's text, but
// be sure to manage the event handling on the parent container, not each item.

export default function EventDelegation() {
    const [text, setText] = useState('');
    return (
      <div data-testid="container">
        <h1>Event Delegation Example</h1>

        <div onClick={(e) => (setText((e.target as HTMLElement).textContent || ''))}>
          <p data-testid="item-1">Item 1</p>
          <p data-testid="item-2">Item 2</p>
          <p data-testid="item-3">Item 3</p>a
        </div>

        <div data-testid="result">
          {/* Display the text of the clicked item here */}
          <p>Cliked item:</p>
        {text}
        </div>
      </div>
    );
  }