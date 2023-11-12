import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { animeCardData } from '~components/AnimeCard/animeCardData.tsx';
import AnimeDetail from '~components/AnimeDetail/animeDetail.tsx';

vi.mock('../../api/api', () => {
  return {
    fetchDataId: vi.fn(() => Promise.resolve({ data: animeCardData[0] })),
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
});
