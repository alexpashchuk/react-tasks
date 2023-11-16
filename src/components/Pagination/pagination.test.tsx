import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '~redux/store.tsx';
import Pagination from './pagination.tsx';

const PAGE = 6;
const TOTAL_PAGE = 20;
const CLICK_PAGE = 4;

const renderPagination = () => {
  render(
    <Provider store={store}>
      <Pagination page={PAGE} totalPages={TOTAL_PAGE} />
    </Provider>,
    { wrapper: BrowserRouter }
  );
};

describe('Pagination tests', () => {
  let urlPage: URL;
  beforeEach(() => {
    renderPagination();
    urlPage = new URL(window.location.href);
    urlPage.searchParams.set('page', String(PAGE));
  });

  it('Updates URL query parameter when click next page', () => {
    const pageValuePrev = urlPage.searchParams.get('page');

    const nextBtn: HTMLButtonElement = screen.getByLabelText(/Show next page/i);
    fireEvent.click(nextBtn);

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(Number(pageValuePrev) + 1));
  });

  it('Updates URL query parameter when click prev page', () => {
    const pageValuePrev = urlPage.searchParams.get('page');

    const prevBtn: HTMLButtonElement = screen.getByLabelText(/Show prev page/i);
    fireEvent.click(prevBtn);

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(Number(pageValuePrev) - 1));
  });

  it('Updates URL query parameter when click first page', () => {
    const firstBtn: HTMLButtonElement = screen.getByLabelText(/Show first page/i);
    if (PAGE > 5) {
      expect(firstBtn).toBeInTheDocument();
      fireEvent.click(firstBtn);
    } else {
      expect(firstBtn).toBeNull();
      return;
    }

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(1));
  });

  it('Updates URL query parameter when click last page', () => {
    const lastBtn: HTMLButtonElement = screen.getByLabelText(/Show last page/i);
    if (TOTAL_PAGE > 5 && PAGE + 4 < TOTAL_PAGE) {
      expect(lastBtn).toBeInTheDocument();
      fireEvent.click(lastBtn);
    } else {
      expect(lastBtn).toBeNull();
      return;
    }

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(TOTAL_PAGE));
  });

  it('Updates URL query parameter when click next five page', () => {
    const pageValuePrev = urlPage.searchParams.get('page');

    const nextFiveBtn: HTMLButtonElement = screen.getByLabelText(/Show next five page/i);
    fireEvent.click(nextFiveBtn);

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(Number(pageValuePrev) + 5));
  });

  it('Updates URL query parameter when click prev five page', () => {
    const pageValuePrev = urlPage.searchParams.get('page');

    const prevFiveBtn: HTMLButtonElement = screen.getByLabelText(/Show prev five page/i);
    fireEvent.click(prevFiveBtn);

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(Number(pageValuePrev) - 5));
  });

  it('Updates URL query parameter when click page', () => {
    const pageBtn: HTMLButtonElement = screen.getByLabelText(`Show page ${CLICK_PAGE}`);
    fireEvent.click(pageBtn);

    const url = new URL(window.location.href);
    const pageValue = url.searchParams.get('page');

    expect(pageValue).toBe(String(CLICK_PAGE));
  });
});
