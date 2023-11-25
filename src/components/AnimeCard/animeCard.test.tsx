import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import AnimeList from '@/components/AnimeList/animeList';
import { animeCardData, paginationData } from '@/test/animeCardData';
import { createMockRouter, createRouterProvider } from '@/test/mockRouter';

const data = {
  animeDetails: { data: animeCardData[0] },
  animeList: { data: animeCardData, pagination: paginationData },
};

describe('Anime card tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Ensure that the card component renders the relevant card data', async () => {
    const RouterProvider = createRouterProvider();
    const wrapper = render(
      <RouterProvider>
        <AnimeList data={data} />
      </RouterProvider>
    );

    const title = await wrapper.findByText(animeCardData[0].title);
    expect(title).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const routerParamsMock = {
      pathname: '/',
      query: {
        page: '1',
        details: `${animeCardData[0].mal_id}`,
      },
    };
    const mockRouter = createMockRouter(routerParamsMock);

    const wrapper = render(
      <RouterContext.Provider value={mockRouter}>
        <AnimeList data={data} />
      </RouterContext.Provider>
    );

    const card = await wrapper.findByTestId(`card${animeCardData[0].mal_id}`);

    await waitFor(() => {
      fireEvent.click(card);
      expect(mockRouter.push).toHaveBeenCalledWith(routerParamsMock);
      expect(wrapper.findByTestId(`details${animeCardData[0].mal_id}`)).toBeTruthy();
    });
  });
});
