import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import AnimeRoot from '@/components/AnimeRoot/animeRoot';
import AnimeDetail from '@/components/AnimeDetail/animeDetail';
import AnimeList from '@/components/AnimeList/animeList';
import { animeCardData } from '@/test/animeCardData';
import store from '@/redux/store';
import { server } from '@/test/msw/server';
import { BASE_URL } from '@/constants/constants';

describe('Anime card tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Ensure that the card component renders the relevant card data', async () => {
    const wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <AnimeList />
        </Provider>
      </MemoryRouter>
    );

    const title = await wrapper.findByText(animeCardData[0].title);
    expect(title).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<AnimeRoot />}>
              <Route path="" element={<AnimeDetail />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const requestMock = vi.fn();
    server.events.on('request:start', ({ request }) => {
      requestMock(request.url);
    });
    const card = await wrapper.findByTestId(`card${animeCardData[0].mal_id}`);

    await waitFor(() => {
      fireEvent.click(card);
      expect(requestMock).toHaveBeenCalledWith(`${BASE_URL}/${animeCardData[0].mal_id}`);
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<AnimeRoot />}>
              <Route path="" element={<AnimeDetail />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const card = await wrapper.findByTestId(`card${animeCardData[0].mal_id}`);

    act(() => {
      fireEvent.click(card);
    });

    expect(await wrapper.findByTestId(`details${animeCardData[0].mal_id}`)).toBeTruthy();
  });
});
