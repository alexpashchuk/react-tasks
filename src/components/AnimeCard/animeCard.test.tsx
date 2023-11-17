import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, act, waitFor } from '@testing-library/react';

import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';
import AnimeList from '~components/AnimeList/animeList.tsx';
import { animeCardData } from '~test/animeCardData.tsx';
import store from '~redux/store.tsx';

describe('Anime card tests', () => {
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
        <Routes>
          <Route
            path="/"
            element={
              <Provider store={store}>
                <AnimeRoot />
              </Provider>
            }
          >
            <Route path="" element={<AnimeDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const card = await wrapper.findByTestId(`card${animeCardData[0].mal_id}`);

    await waitFor(() => {
      fireEvent.click(card);
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <Provider store={store}>
                <AnimeRoot />
              </Provider>
            }
          >
            <Route path="" element={<AnimeDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const card = await wrapper.findByTestId(`card${animeCardData[0].mal_id}`);

    act(() => {
      fireEvent.click(card);
    });

    expect(await wrapper.findByTestId(`details${animeCardData[0].mal_id}`)).toBeTruthy();
  });
});
