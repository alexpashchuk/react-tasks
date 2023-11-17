import { MemoryRouter } from 'react-router-dom';
import { waitFor, render } from '@testing-library/react';
import { Provider } from 'react-redux';

import AnimeList from '~components/AnimeList/animeList.tsx';
import store from '~redux/store.tsx';

describe('Anime list tests', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    const wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <AnimeList />
        </Provider>
      </MemoryRouter>
    );
    const items = await wrapper.findAllByTestId(/card/i);
    expect(items.length).toBe(20);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
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
