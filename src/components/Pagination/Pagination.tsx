import classes from './pagination.module.css';
import clsx from 'clsx';

type PaginationProps = {
    page: number;
    totalPages: number;
    prevPage: () => void;
    nextPage: () => void;
};

const Pagination = ({ page, totalPages, prevPage, nextPage }: PaginationProps) => {
    return (
        <nav className={classes.pagination} aria-label="page navigation">
            <button disabled={page === 1} className={clsx('button', classes.paginationBtn)} onClick={prevPage}>
                Prev
            </button>
            <button disabled={page === totalPages} className={clsx('button', classes.paginationBtn)} onClick={nextPage}>
                Next
            </button>
        </nav>
    );
};

export default Pagination;
