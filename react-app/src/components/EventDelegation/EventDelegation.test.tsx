import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDelegation from './EventDelegation';

test('renders container and items', () => {
  render(<EventDelegation />);
  expect(screen.getByTestId('container')).toBeInTheDocument();
  expect(screen.getByTestId('item-1')).toHaveTextContent('Item 1');
  expect(screen.getByTestId('item-2')).toHaveTextContent('Item 2');
  expect(screen.getByTestId('item-3')).toHaveTextContent('Item 3');
});

test('clicking on items updates the result area with the clicked text', () => {
  render(<EventDelegation />);
  const result = screen.getByTestId('result');

  const item1 = screen.getByTestId('item-1');
  const item2 = screen.getByTestId('item-2');

  fireEvent.click(item1);
  expect(result).toHaveTextContent('Item 1');

  fireEvent.click(item2);
  expect(result).toHaveTextContent('Item 2');
});
