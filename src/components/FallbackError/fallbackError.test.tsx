import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import FallbackError from './fallbackError.tsx';

describe('FallbackError tests', () => {
  it('renders the Error title', () => {
    render(<FallbackError />);
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the something went wrong text', () => {
    render(<FallbackError />);
    const textElement = screen.getByText(/Something went wrong/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders the back button', () => {
    render(<FallbackError />);
    const buttonElement = screen.getByRole('link', { name: /Back Home/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
