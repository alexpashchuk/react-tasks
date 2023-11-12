import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';
import { AnimeContextProvider } from '~context/animeContext.tsx';
import { fetchDataId } from '../../api/api.tsx';
import { animeCardData, paginationData } from './animeCardData.tsx';

vi.mock('../../api/api', () => {
  return {
    fetchData: vi.fn(() => Promise.resolve({ data: animeCardData, pagination: paginationData })),
    fetchDataId: vi.fn(() => Promise.resolve({ data: animeCardData[0] })),
  };
});

describe('Anime card tests', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <AnimeContextProvider>
                <AnimeRoot />
              </AnimeContextProvider>
            }
          >
            <Route path="" element={<AnimeDetail />} />
          </Route>
        </Routes>
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
              <AnimeContextProvider>
                <AnimeRoot />
              </AnimeContextProvider>
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
              <AnimeContextProvider>
                <AnimeRoot />
              </AnimeContextProvider>
            }
          >
            <Route path="" element={<AnimeDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(async () => {
      const card = await wrapper.findByTestId(`card${animeCardData[0].mal_id}`);
      screen.debug();
      fireEvent.click(card);
      expect(wrapper.findByTestId(`details${animeCardData[0].mal_id}`)).not.toBeNull();
    });
  });
});
