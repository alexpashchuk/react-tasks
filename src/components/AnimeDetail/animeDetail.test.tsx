import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, render, waitFor, act } from '@testing-library/react';

import { animeCardData } from '~test/animeCardData.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';
import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import store from '~redux/store.tsx';

describe('Anime Detail tests', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
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

    await waitFor(() => {
      const title = wrapper.getAllByText(/Cowboy Bebop/i);
      // const season = wrapper.getAllByText(/spring/i);
      // const rank = wrapper.getAllByText(/rank/i);
      // const year = wrapper.getAllByText(/year/i);
      expect(title[0]).toBeInTheDocument();
      // expect(season[0]).toBeInTheDocument();
      // expect(rank[0]).toBeInTheDocument();
      // expect(year[0]).toBeInTheDocument();
    });
  });
  it('Check that a loading indicator is displayed while fetching data;', async () => {
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

    fireEvent.click(card);

    const loader = await wrapper.findByTestId('spinner');
    expect(loader).toBeInTheDocument();
  });
  it('Ensure that clicking the close button hides the component', async () => {
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

    const closeButton = await wrapper.findByTestId('close');

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(wrapper.queryByTestId(`details${animeCardData[0].mal_id}`)).toBeFalsy();
  });
});
