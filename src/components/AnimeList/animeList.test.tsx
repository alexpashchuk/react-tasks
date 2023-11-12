import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React, { useContext } from 'react';
import { vi } from 'vitest';

import AnimeList from '~components/AnimeList/animeList.tsx';
import { animeCardData } from '~components/AnimeCard/animeCardData.tsx';

vi.mock('react', async () => ({
  ...(await vi.importActual<typeof import('react')>('react')),
  useContext: vi.fn(() => ({ data: animeCardData, setData: vi.fn() })),
}));

describe('Anime list tests', () => {
  afterEach(cleanup);
  test('Verify that the component renders the specified number of cards', async () => {
    vi.mocked(useContext).mockReturnValue({
      data: animeCardData,
      setData: () => {},
    });
    const wrapper = render(
      <MemoryRouter>
        <AnimeList />
      </MemoryRouter>
    );
    const items = await wrapper.findAllByTestId(/card/i);
    expect(items.length).toBe(animeCardData.length);
  });

  test('Check that an appropriate message is displayed if no cards are present', async () => {
    vi.mocked(useContext).mockReturnValue({
      data: [],
      setData: () => {},
    });
    const wrapper = render(
      <MemoryRouter>
        <AnimeList />
      </MemoryRouter>
    );
    const notFoundMessage = await wrapper.findByText(/Items Not Found 🙄/i);
    expect(notFoundMessage).not.toBeFalsy();
  });
});
