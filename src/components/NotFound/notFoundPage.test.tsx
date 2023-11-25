import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '@/test/mockRouter';
import NotFoundPage from '@/components/NotFound/notFoundPage';

describe('NotFoundPage tests', () => {
  it('the 404 page is displayed when navigating to an invalid route', async () => {
    const routerParamsMock = {
      pathname: '/404',
      query: {
        page: '1',
      },
    };

    const mockRouter = createMockRouter(routerParamsMock);
    const wrapper = render(
      <RouterContext.Provider value={mockRouter}>
        <NotFoundPage />
      </RouterContext.Provider>
    );

    const textElement = wrapper.getByText(/Page not found/i);
    expect(textElement).toBeInTheDocument();

    const buttonElement = wrapper.getByRole('link', { name: /Back Home/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
