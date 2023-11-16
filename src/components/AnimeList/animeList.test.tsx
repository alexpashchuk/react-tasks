import { MemoryRouter } from 'react-router-dom';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import AnimeList from '~components/AnimeList/animeList.tsx';
import { animeCardData } from '~components/AnimeCard/animeCardData.tsx';
import store from '~redux/store.tsx';

vi.mock('react', async () => ({
  ...(await vi.importActual<typeof import('react')>('react')),
  useContext: vi.fn(() => ({ data: animeCardData, setData: vi.fn() })),
}));

describe('Anime list tests', () => {
  afterEach(() => {
    vi.mocked(useContext).mockReturnValue({
      data: [],
      setData: vi.fn(),
    });
  });
  it('Verify that the component renders the specified number of cards', async () => {
    vi.mocked(useContext).mockReturnValue({
      data: animeCardData,
      setData: vi.fn(),
    });
    const wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <AnimeList />
        </Provider>
      </MemoryRouter>
    );
    const items = await wrapper.findAllByTestId(/card/i);
    expect(items.length).toBe(animeCardData.length);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    vi.mocked(useContext).mockReturnValue({
      data: [],
      setData: vi.fn(),
    });
    const wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <AnimeList />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const notFoundMessage = wrapper.getByText(/Items Not Found 🙄/i);
      expect(notFoundMessage).not.toBeFalsy();
    });
  });
});
