import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import Pagination from './pagination';
import { createMockRouter } from '@/test/mockRouter';

const PAGE = 6;
const TOTAL_PAGE = 20;
const CLICK_PAGE = 4;

describe('Pagination tests', () => {
  const routerParamsMock = {
    pathname: '/',
    page: `${PAGE}`,
  };
  const mockRouter = createMockRouter(routerParamsMock);
  beforeEach(() => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination page={PAGE} totalPages={TOTAL_PAGE} />
      </RouterContext.Provider>
    );
  });
  it('Updates URL query parameter when click next page', () => {
    const nextBtn: HTMLButtonElement = screen.getByLabelText(/Show next page/i);
    fireEvent.click(nextBtn);

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: `${PAGE + 1}` },
      },
      undefined,
      { scroll: false }
    );
  });

  it('Updates URL query parameter when click prev page', () => {
    const prevBtn: HTMLButtonElement = screen.getByLabelText(/Show prev page/i);
    fireEvent.click(prevBtn);

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: `${PAGE - 1}` },
      },
      undefined,
      { scroll: false }
    );
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

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: '1' },
      },
      undefined,
      { scroll: false }
    );
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

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: `${TOTAL_PAGE}` },
      },
      undefined,
      { scroll: false }
    );
  });

  it('Updates URL query parameter when click next five page', () => {
    const nextFiveBtn: HTMLButtonElement = screen.getByLabelText(/Show next five page/i);
    fireEvent.click(nextFiveBtn);

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: `${PAGE + 5}` },
      },
      undefined,
      { scroll: false }
    );
  });

  it('Updates URL query parameter when click prev five page', () => {
    const prevFiveBtn: HTMLButtonElement = screen.getByLabelText(/Show prev five page/i);
    fireEvent.click(prevFiveBtn);

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: `${PAGE - 5}` },
      },
      undefined,
      { scroll: false }
    );
  });

  it('Updates URL query parameter when click page', () => {
    const pageBtn: HTMLButtonElement = screen.getByLabelText(`Show page ${CLICK_PAGE}`);
    fireEvent.click(pageBtn);

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: `${CLICK_PAGE}` },
      },
      undefined,
      { scroll: false }
    );
  });
});
