import { waitFor, render } from '@testing-library/react';
import { vi } from 'vitest';

import AnimeList from '@/components/AnimeList/animeList';
import { animeCardData, paginationData } from '@/test/animeCardData';
import { server } from '@/test/msw/server';
import { createRouterProvider } from '@/test/mockRouter';

describe('Anime list tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });
  it('Verify that the component renders the specified number of cards', async () => {
    const data = {
      animeDetails: { data: animeCardData[0] },
      animeList: { data: animeCardData, pagination: paginationData },
    };
    const RouterProvider = createRouterProvider();
    const wrapper = render(
      <RouterProvider>
        <AnimeList data={data} />
      </RouterProvider>
    );
    const items = await wrapper.findAllByTestId(/card/i);
    expect(items.length).toBe(animeCardData.length);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    const data = {
      animeDetails: { data: animeCardData[0] },
      animeList: { data: [], pagination: paginationData },
    };
    const RouterProvider = createRouterProvider();
    const wrapper = render(
      <RouterProvider>
        <AnimeList data={data} />
      </RouterProvider>
    );

    waitFor(() => {
      const message = wrapper.getByText(/Items Not Found 🙄/i);
      expect(message).not.toBeFalsy();
    });
  });
});
