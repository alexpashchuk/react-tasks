import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';
import store from '~redux/store.tsx';
import SearchBar from './searchBar.tsx';

const VALUE = 'test';
const EMPTY_VALUE = '';

const renderSearchBar = () => {
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
    { wrapper: BrowserRouter }
  );
};

describe('Search Bar tests', () => {
  let searchInput: HTMLInputElement;
  beforeEach(() => {
    renderSearchBar();
    searchInput = screen.getByRole('searchbox');
  });
  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    fireEvent.change(searchInput, { target: { value: VALUE } });
    fireEvent.submit(searchInput);
    expect(localStorage.getItem(SEARCH_VALUE_STORAGE_KEY)).toBe(VALUE);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, VALUE);
    expect(searchInput.value).toBe(VALUE);
  });

  it('Updates search value when input changes', () => {
    fireEvent.change(searchInput, { target: { value: VALUE } });
    expect(searchInput.value).toBe(VALUE);
  });

  it('Updates search query param on submit', () => {
    fireEvent.change(searchInput, { target: { value: VALUE } });
    fireEvent.submit(searchInput);
    const url = new URL(window.location.href);
    const searchValue = url.searchParams.get('search');
    const pageValue = url.searchParams.get('page');
    expect(searchValue).toBe(VALUE);
    expect(pageValue).toBe('1');
  });

  it('Clear search query param on submit with empty value', () => {
    fireEvent.change(searchInput, { target: { value: EMPTY_VALUE } });
    fireEvent.submit(searchInput);
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    const searchValue = url.searchParams.get('search');
    expect(searchValue).toBeNull();
  });
});
