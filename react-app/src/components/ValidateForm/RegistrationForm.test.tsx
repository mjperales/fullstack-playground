import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

test('validates empty form submission', () => {
    render(<RegistrationForm />);

    // Find and submit the form
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    // Check that error messages appear somewhere in the document
    expect(screen.getByText(/name.*required|required.*name/i)).toBeInTheDocument();
    expect(screen.getByText(/email.*invalid|invalid.*email/i)).toBeInTheDocument();
    expect(screen.getByText(/password.*8|password.*characters/i)).toBeInTheDocument();
  });

  test('accepts valid form submission', () => {
    render(<RegistrationForm />);

    // Find inputs
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);

    // Fill in valid data
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit form
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    // Verify no error messages are present
    expect(screen.queryByText(/required|invalid|characters/i)).not.toBeInTheDocument();

    // Verify some kind of success indication is present
    expect(screen.getByText(/success|submitted|registered/i)).toBeInTheDocument();
  });

  test('validates email format', () => {
    render(<RegistrationForm />);

    // Find email input and submit button
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button');

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // Verify email error appears
    expect(screen.getByText(/email.*invalid|invalid.*email/i)).toBeInTheDocument();
  });

  test('validates password length', () => {
    render(<RegistrationForm />);

    // Find password input and submit button
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button');

    // Test short password
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    // Verify password error appears
    expect(screen.getByText(/password.*8|characters.*8/i)).toBeInTheDocument();
  });