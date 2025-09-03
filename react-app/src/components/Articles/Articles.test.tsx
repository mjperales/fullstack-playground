import { render, screen, fireEvent, within } from '@testing-library/react';
import Articles from './Articles'; // your component

const articles = [
  {
    id: 1,
    title: 'React Performance Tips',
    upvotes: 10,
    date: '2025-09-01',
  },
  {
    id: 2,
    title: 'Understanding Maps in JS',
    upvotes: 5,
    date: '2025-09-02',
  },
];

describe('Articles Component (Table UI)', () => {
  test('renders table with article data', () => {
    render(<Articles articles={articles} />);

    const rows = screen.getAllByTestId('article');
    expect(rows).toHaveLength(2);

    // First row assertions
    expect(within(rows[0]).getByTestId('article-title')).toHaveTextContent(
      'React Performance Tips'
    );
    expect(within(rows[0]).getByTestId('article-upvotes')).toHaveTextContent(
      '10'
    );
    expect(within(rows[0]).getByTestId('article-date')).toHaveTextContent(
      '2025-09-01'
    );
  });

  test('unique visitors start at 0', () => {
    render(<Articles articles={articles} />);
    const rows = screen.getAllByTestId('article');
    const visitorCell = within(rows[0]).getAllByRole('cell')[2]; // 3rd column
    expect(visitorCell).toHaveTextContent('0');
  });

  test('simulate visit increments unique visitors', () => {
    render(<Articles articles={articles} />);
    const rows = screen.getAllByTestId('article');
    const simulateButton = within(rows[0]).getByRole('button', {
      name: /simulate visit/i,
    });

    fireEvent.click(simulateButton);
    fireEvent.click(simulateButton);

    // Depending on your implementation, duplicates may or may not increment
    const visitorCell = within(rows[0]).getAllByRole('cell')[2];
    expect(parseInt(visitorCell.textContent || '0', 10)).toBeGreaterThanOrEqual(
      1
    );
  });

  test('each article tracks unique visitors separately', () => {
    render(<Articles articles={articles} />);
    const rows = screen.getAllByTestId('article');

    const button1 = within(rows[0]).getByRole('button', {
      name: /simulate visit/i,
    });
    const button2 = within(rows[1]).getByRole('button', {
      name: /simulate visit/i,
    });

    fireEvent.click(button1);
    fireEvent.click(button2);

    const visitorCell1 = within(rows[0]).getAllByRole('cell')[2];
    const visitorCell2 = within(rows[1]).getAllByRole('cell')[2];

    expect(visitorCell1).toHaveTextContent('1');
    expect(visitorCell2).toHaveTextContent('1');
  });
});
