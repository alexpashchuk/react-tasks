import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
// import * as reduxHooks from 'react-redux';

import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';
import AnimeList from '~components/AnimeList/animeList.tsx';
import { fetchDataId } from '../../api/api.tsx';
import { animeCardData, paginationData } from './animeCardData.tsx';
import store from '~redux/store.tsx';

// vi.mock('react-redux');
// const mockDispatch = vi.spyOn(reduxHooks, 'useDispatch');
// mockDispatch.mockReturnValue(vi.fn());

vi.mock('../../api/api', () => {
  return {
    fetchData: vi.fn(() => Promise.resolve({ data: animeCardData, pagination: paginationData })),
    fetchDataId: vi.fn(() => Promise.resolve({ data: animeCardData[0] })),
  };
});

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
      expect(fetchDataId).toBeCalled();
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
