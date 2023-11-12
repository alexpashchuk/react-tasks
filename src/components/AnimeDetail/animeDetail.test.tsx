import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import { animeCardData, paginationData } from '~components/AnimeCard/animeCardData.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';
import { AnimeContextProvider } from '~context/animeContext.tsx';
import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import React from 'react';
import { act } from 'react-dom/test-utils';

vi.mock('../../api/api', () => {
  return {
    fetchData: vi.fn(() => Promise.resolve({ data: animeCardData, pagination: paginationData })),
    fetchDataId: vi.fn(async () => {
      await new Promise((res) => {
        setTimeout(() => {
          res('');
        }, 500);
      });
      return Promise.resolve({ data: animeCardData[0] });
    }),
  };
});

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof import('react-router-dom')>('react-router-dom')),
  useOutletContext: () => ({
    handleCloseDetails: vi.fn(),
  }),
}));

describe('Anime Detail tests', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const wrapper = render(
      <MemoryRouter>
        <AnimeDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      const item = wrapper.getByTestId(/details/i);
      const title = screen.getByText(/Cowboy Bebop/i);
      const season = screen.getByText(/spring/i);
      expect(item).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(season).toBeInTheDocument();
    });
  });
  it('Check that a loading indicator is displayed while fetching data;', async () => {
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

    fireEvent.click(card);

    const loader = await wrapper.findByText('spinner');
    expect(loader).toBeInTheDocument();
  });
  it('Ensure that clicking the close button hides the component', async () => {
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

    act(() => {
      fireEvent.click(card);
    });

    const closeButton = await wrapper.findByTestId('close');

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(wrapper.queryByTestId(`details${animeCardData[0].mal_id}`)).toBeFalsy();
  });
  test('Validate that clicking on a card opens a detailed card component', async () => {
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

    act(() => {
      fireEvent.click(card);
    });

    expect(await wrapper.findByTestId(`details${animeCardData[0].mal_id}`)).toBeTruthy();
  });
});
