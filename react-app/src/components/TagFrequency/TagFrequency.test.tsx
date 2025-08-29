// TagFrequency.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TagFrequency from './TagFrequency';

const posts = [
  { id: 1, title: 'React Performance Tips', tags: ['react', 'performance'] },
  {
    id: 2,
    title: 'Understanding Maps in JS',
    tags: ['javascript', 'map', 'performance'],
  },
  { id: 3, title: 'TypeScript Basics', tags: ['typescript', 'javascript'] },
];

describe('TagFrequency Component', () => {
  it('renders all posts initially', () => {
    render(<TagFrequency posts={posts} />);
    expect(screen.getByText('React Performance Tips')).toBeInTheDocument();
    expect(screen.getByText('Understanding Maps in JS')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Basics')).toBeInTheDocument();
  });

  it('renders tag frequencies correctly', () => {
    render(<TagFrequency posts={posts} />);
    expect(screen.getByText(/javascript \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/performance \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/react \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText(/map \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText(/typescript \(1\)/i)).toBeInTheDocument();
  });

  it('filters posts when a tag is clicked', () => {
    render(<TagFrequency posts={posts} />);
    fireEvent.click(screen.getByText(/javascript/i));

    // Only posts with "javascript" should remain
    expect(screen.getByText('TypeScript Basics')).toBeInTheDocument();
    expect(screen.getByText('Understanding Maps in JS')).toBeInTheDocument();
    expect(
      screen.queryByText('React Performance Tips')
    ).not.toBeInTheDocument();
  });

  it('clears filter when clicked again', () => {
    render(<TagFrequency posts={posts} />);
    const javascriptTag = screen.getByText(/javascript/i);

    fireEvent.click(javascriptTag); // apply filter
    fireEvent.click(javascriptTag); // remove filter

    // All posts should come back
    expect(screen.getByText('React Performance Tips')).toBeInTheDocument();
    expect(screen.getByText('Understanding Maps in JS')).toBeInTheDocument();
    expect(screen.getByText('TypeScript Basics')).toBeInTheDocument();
  });
});
