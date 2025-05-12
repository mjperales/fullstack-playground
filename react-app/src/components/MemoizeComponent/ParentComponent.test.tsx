import { render, screen, fireEvent } from '@testing-library/react';
import ParentComponent from './ParentComponent';


test('Child only re-renders when count changes, not when text changes', () => {
    render(<ParentComponent />);

    const parentCount = screen.getByTestId('parent-count');
    const incrementButton = screen.getByTestId('increment-button');
    const textInput = screen.getByTestId('text-input');
    const childRenderCount = screen.getByTestId('child-render-count');

    // Initial child render count should be 1
    expect(childRenderCount).toHaveTextContent('1');

    // 1) Changing text should NOT increment child's render count
    fireEvent.change(textInput, { target: { value: 'Hello' } });
    expect(childRenderCount).toHaveTextContent('1');

    // 2) Incrementing count should cause child to re-render
    fireEvent.click(incrementButton);
    expect(parentCount).toHaveTextContent('Count: 1');
    // Child's render count goes up
    expect(childRenderCount).toHaveTextContent('2');

    // 3) Changing text again
    fireEvent.change(textInput, { target: { value: 'World' } });
    // Child stays at 2
    expect(childRenderCount).toHaveTextContent('2');
  });
