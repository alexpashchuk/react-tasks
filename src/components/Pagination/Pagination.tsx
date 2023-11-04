import clsx from 'clsx';

import LogoChevronLeft from '~assets/icons/chevron-left.svg';
import LogoChevronDoubleLeft from '~assets/icons/chevron-double-left.svg';
import LogoChevronRight from '~assets/icons/chevron-right.svg';
import LogoChevronDoubleRight from '~assets/icons/chevron-double-right.svg';
import { usePagination } from '~hooks/usePagination.tsx';

import classes from './pagination.module.css';

export type PaginationProps = {
  page: number;
  totalPages: number;
  setSkip: (s: boolean) => void;
};

const Pagination = (props: PaginationProps) => {
  const { pagesArray, page, totalPages, prevFivePages, nextFivePages, handlePageChange } = usePagination(props);

  return (
    <nav className={classes.pagination} aria-label="page navigation">
      <button disabled={page <= 1} onClick={() => handlePageChange(prevFivePages)} className={classes.page}>
        <LogoChevronDoubleLeft />
      </button>
      <button disabled={page <= 1} className={classes.page} onClick={() => handlePageChange(page - 1)}>
        <LogoChevronLeft />
      </button>
      {page > 5 && (
        <>
          <button onClick={() => handlePageChange(1)} className={classes.page}>
            1
          </button>
          {page > 6 && <span className={classes.dots}>...</span>}
        </>
      )}
      {pagesArray.map((p) => (
        <button
          onClick={() => handlePageChange(p)}
          key={p}
          className={clsx(classes.page, page === p && classes.pageCurrent)}
        >
          {p}
        </button>
      ))}
      {totalPages > 5 && page + 4 < totalPages && (
        <>
          <span className={classes.dots}>...</span>
          <button onClick={() => handlePageChange(totalPages)} className={classes.page}>
            {totalPages}
          </button>
        </>
      )}
      <button disabled={page >= totalPages} className={classes.page} onClick={() => handlePageChange(page + 1)}>
        <LogoChevronRight />
      </button>
      <button disabled={page >= totalPages} onClick={() => handlePageChange(nextFivePages)} className={classes.page}>
        <LogoChevronDoubleRight />
      </button>
    </nav>
  );
};

export default Pagination;
