import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { createMockRouter } from '@/test/mockRouter';
import { animeCardData, paginationData } from '@/test/animeCardData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import AnimeRoot from '@/pages';

const data = {
  animeDetails: { data: animeCardData[0] },
  animeList: { data: animeCardData, pagination: paginationData },
};

describe('NotFoundPage tests', () => {
  it('the 404 page is displayed when navigating to an invalid route', () => {
    const routerParamsMock = {
      pathname: '/404',
      query: {
        page: '1',
      },
    };

    const mockRouter = createMockRouter(routerParamsMock);
    const wrapper = render(
      <RouterContext.Provider value={mockRouter}>
        <AnimeRoot data={data} />
      </RouterContext.Provider>
    );

    const titleElement = wrapper.getByRole('heading');
    expect(titleElement).toBeInTheDocument();

    const textElement = wrapper.getByText(/Page not found/i);
    expect(textElement).toBeInTheDocument();

    const buttonElement = wrapper.getByRole('link', { name: /Back Home/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
