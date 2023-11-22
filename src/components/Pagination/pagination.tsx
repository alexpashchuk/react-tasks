import clsx from 'clsx';

import LogoChevronLeft from '@/icons/chevron-left.svg';
import LogoChevronDoubleLeft from '@/icons/chevron-double-left.svg';
import LogoChevronRight from '@/icons/chevron-right.svg';
import LogoChevronDoubleRight from '@/icons/chevron-double-right.svg';
import { usePagination } from '@/hooks/usePagination';

import classes from './pagination.module.css';

export type PaginationProps = {
  page: number;
  totalPages: number;
};

const Pagination = (props: PaginationProps) => {
  const { pagesArray, page, totalPages, prevFivePages, nextFivePages, handlePageChange } = usePagination(props);

  return (
    <nav className={classes.pagination} aria-label="Page pavigation">
      <button
        aria-label="Show prev five page"
        disabled={page <= 1}
        onClick={() => handlePageChange(prevFivePages)}
        className={classes.page}
      >
        <LogoChevronDoubleLeft />
      </button>
      <button
        aria-label="Show prev page"
        disabled={page <= 1}
        className={classes.page}
        onClick={() => handlePageChange(page - 1)}
      >
        <LogoChevronLeft />
      </button>
      {page > 5 && (
        <>
          <button aria-label="Show first page" onClick={() => handlePageChange(1)} className={classes.page}>
            1
          </button>
          {page > 6 && <span className={classes.dots}>...</span>}
        </>
      )}
      {pagesArray.map((p) => (
        <button
          aria-current={page === p}
          aria-label={`Show page ${p}`}
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
          <button aria-label="Show last page" onClick={() => handlePageChange(totalPages)} className={classes.page}>
            {totalPages}
          </button>
        </>
      )}
      <button
        aria-label="Show next page"
        disabled={page >= totalPages}
        className={classes.page}
        onClick={() => handlePageChange(page + 1)}
      >
        <LogoChevronRight />
      </button>
      <button
        aria-label="Show next five page"
        disabled={page >= totalPages}
        onClick={() => handlePageChange(nextFivePages)}
        className={classes.page}
      >
        <LogoChevronDoubleRight />
      </button>
    </nav>
  );
};

export default Pagination;
