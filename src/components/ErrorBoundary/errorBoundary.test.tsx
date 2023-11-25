import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './errorBoundary';

describe('Error Boundary', () => {
  it(`should render error boundary component when there is an error`, () => {
    const renderProviders = (ui: React.ReactElement) => render(ui, {});
    const ThrowError = () => {
      throw new Error('Error');
    };
    const { getByText } = renderProviders(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    vi.spyOn(console, 'error').mockImplementation(() => null);
    expect(() => render(<ThrowError />)).toThrow();

    const errorMessage = getByText(/Something went wrong/i);
    expect(errorMessage).toBeDefined();
  });
});
