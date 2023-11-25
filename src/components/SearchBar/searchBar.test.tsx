import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import SearchBar from './searchBar';
import { createMockRouter } from '@/test/mockRouter';

const VALUE = 'test';
const EMPTY_VALUE = '';

describe('Search Bar tests', () => {
  const routerParamsMock = {
    pathname: '/',
    page: '1',
    search: '',
  };
  const mockRouter = createMockRouter(routerParamsMock);
  let searchInput: HTMLInputElement;
  beforeEach(() => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SearchBar />
      </RouterContext.Provider>
    );
    searchInput = screen.getByRole('searchbox');
  });

  it('Updates search value when input changes', () => {
    fireEvent.change(searchInput, { target: { value: VALUE } });
    expect(searchInput.value).toBe(VALUE);
  });

  it('Updates search query param on submit', () => {
    fireEvent.change(searchInput, { target: { value: VALUE } });
    fireEvent.submit(searchInput);

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: '1', search: `${VALUE}` },
      },
      undefined,
      { scroll: false }
    );
  });

  it('Clear search query param on submit with empty value', () => {
    fireEvent.change(searchInput, { target: { value: EMPTY_VALUE } });
    fireEvent.submit(searchInput);

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: '1' },
      },
      undefined,
      { scroll: false }
    );
  });
});
