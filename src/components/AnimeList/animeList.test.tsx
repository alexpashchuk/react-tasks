import { MemoryRouter } from 'react-router-dom';
import { waitFor, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { http, HttpResponse } from 'msw';

import AnimeList from '@/components/AnimeList/animeList';
import store from '@/redux/store';
import { BASE_URL } from '@/constants/constants';
import { animeCardData, paginationData } from '@/test/animeCardData';
import { server } from '@/test/msw/server';

const RenderAnimeList = () => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AnimeList />
      </Provider>
    </MemoryRouter>
  );
};

describe('Anime list tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });
  it('Verify that the component renders the specified number of cards', async () => {
    const wrapper = render(<RenderAnimeList />);
    const items = await wrapper.findAllByTestId(/card/i);
    expect(items.length).toBe(animeCardData.length);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    server.use(
      http.get(
        `${BASE_URL}*`,
        () => {
          return HttpResponse.json({
            data: [],
            pagination: paginationData,
          });
        },
        { once: true }
      )
    );

    const wrapper = render(<RenderAnimeList />);

    waitFor(() => {
      const message = wrapper.getByText(/Items Not Found 🙄/i);
      expect(message).not.toBeFalsy();
    });
  });
});
