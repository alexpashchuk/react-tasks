import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AnimeContext } from '~context/animeContext.tsx';
import AnimeList from '~components/AnimeList/animeList.tsx';
import { animeCardData } from '~components/AnimeCard/animeCardData.tsx';

const renderAnimeList = () => {
  render(
    <AnimeContext.Provider
      value={{ searchValue: '', setSearchValue: () => {}, data: animeCardData, setData: () => {} }}
    >
      <AnimeList />
    </AnimeContext.Provider>,
    { wrapper: BrowserRouter }
  );
};

const renderAnimeListWithoutData = () => {
  render(
    <AnimeContext.Provider value={{ searchValue: '', setSearchValue: () => {}, data: [], setData: () => {} }}>
      <AnimeList />
    </AnimeContext.Provider>,
    { wrapper: BrowserRouter }
  );
};

describe('Anime list tests', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    renderAnimeList();

    await waitFor(async () => {
      const itemList = await screen.findAllByTestId(/card/i);
      expect(itemList.length).toBe(animeCardData.length);
    });
  });
  it('Check that an appropriate message is displayed if no cards are present', async () => {
    renderAnimeListWithoutData();

    await waitFor(() => {
      const notFoundMessage = screen.getByText(/Items Not Found 🙄/i);
      expect(notFoundMessage).toBeInTheDocument();
    });
  });
});
