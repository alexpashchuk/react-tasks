import { MemoryRouter } from 'react-router-dom';
import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import AnimeList from '~components/AnimeList/animeList.tsx';
import { animeCardData } from '~components/AnimeCard/animeCardData.tsx';

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
        <AnimeList />
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
        <AnimeList />
      </MemoryRouter>
    );

    await waitFor(() => {
      const notFoundMessage = wrapper.getByText(/Items Not Found 🙄/i);
      expect(notFoundMessage).not.toBeFalsy();
    });
  });
});
