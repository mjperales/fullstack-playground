import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders all items', () => {
  render(<App />);
  const data = screen.getByText(/data/i);
  expect(data).toBeInTheDocument();
});
