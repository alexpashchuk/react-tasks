import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { AnimeContextProvider } from '~context/animeContext.tsx';
import AnimeRoot from '~components/AnimeRoot/animeRoot.tsx';
import PageSize from './pageSize.tsx';

const PER_PAGE = 20;
const SELECT_PER_PAGE = 10;

const renderPageSize = () => {
  render(
    <AnimeContextProvider>
      <AnimeRoot />
      <PageSize />
    </AnimeContextProvider>,
    { wrapper: BrowserRouter }
  );
};

describe('PageSize tests', () => {
  let urlPageSize: URL;
  beforeEach(() => {
    renderPageSize();
    urlPageSize = new URL(window.location.href);
    urlPageSize.searchParams.set('per_page', String(PER_PAGE));
  });
  it('Updates URL query parameter when change per page size', () => {
    const pageSizeValuePrev = urlPageSize.searchParams.get('per_page');

    const select: HTMLSelectElement = screen.getByRole('combobox');
    fireEvent.change(select, {
      target: { value: SELECT_PER_PAGE },
    });

    const url = new URL(window.location.href);
    const pageSizeValue = url.searchParams.get('per_page');

    expect(pageSizeValue).toBe(String(SELECT_PER_PAGE));
    expect(pageSizeValue).not.toBe(pageSizeValuePrev);
  });
});
