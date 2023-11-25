import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import PageSize from './pageSize';
import { createMockRouter } from '@/test/mockRouter';

const PER_PAGE = 20;
const SELECT_PER_PAGE = 10;

describe('PageSize tests', () => {
  const routerParamsMock = {
    pathname: '/',
    page: '1',
    perPage: `${PER_PAGE}`,
  };
  const mockRouter = createMockRouter(routerParamsMock);
  beforeEach(() => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <PageSize />
      </RouterContext.Provider>
    );
  });
  it('Updates URL query parameter when change per page size', () => {
    const select: HTMLSelectElement = screen.getByRole('combobox');
    fireEvent.change(select, {
      target: { value: SELECT_PER_PAGE },
    });

    expect(mockRouter.push).toHaveBeenCalledWith(
      {
        pathname: '/',
        query: { page: '1', perPage: `${SELECT_PER_PAGE}` },
      },
      undefined,
      { scroll: false }
    );
  });
});
