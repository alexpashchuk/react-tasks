import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { animeCardData, paginationData } from '@/test/animeCardData';
import { createMockRouter } from '@/test/mockRouter';
import AnimeDetail from '@/components/AnimeDetail/animeDetail';
import AnimeList from '@/components/AnimeList/animeList';

const data = {
  animeDetails: { data: animeCardData[0] },
  animeList: { data: [], pagination: paginationData },
};

describe('Anime Detail tests', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
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
        <AnimeDetail data={animeCardData[0]} closeDetails={() => vi.fn()} />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      const title = wrapper.getByText(/Cowboy Bebop/i);
      const season = wrapper.getByText(/spring/i);
      const rank = wrapper.getByText(/rank/i);
      const year = wrapper.getByText(/year/i);
      expect(title).toBeInTheDocument();
      expect(season).toBeInTheDocument();
      expect(rank).toBeInTheDocument();
      expect(year).toBeInTheDocument();
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
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

    const closeButton = await wrapper.findByTestId('close');

    await waitFor(() => {
      fireEvent.click(closeButton);
    });
    expect(await wrapper.findByTestId(`details${animeCardData[0].mal_id}`)).toBeTruthy();
  });
});
