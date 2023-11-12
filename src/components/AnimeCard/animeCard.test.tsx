import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AnimeCard from '~components/AnimeCard/animeCard.tsx';
import { animeCardData } from './animeCardData.tsx';

const renderAnimeCard = () => {
  render(<AnimeCard anime={animeCardData[0]} isLoadingImage={false} setIsLoadingImage={() => false} />, {
    wrapper: BrowserRouter,
  });
};

describe('Anime card tests', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    renderAnimeCard();
    await waitFor(() => {
      const title = screen.getByText(animeCardData[0].title);
      expect(title).toBeInTheDocument();
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    renderAnimeCard();
    const card = screen.getByTestId(/card/i);
    fireEvent.click(card);

    const detailsCard = screen.findByText(animeCardData[0].season);
    expect(detailsCard).not.toBeNull();
  });
});
