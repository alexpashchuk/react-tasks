import classes from './pagination.module.css';
import clsx from 'clsx';
import { useMemo } from 'react';

type PaginationProps = {
    page: number;
    totalPages: number;
    prevPage: () => void;
    nextPage: () => void;
    changePage: (p: number) => void;
};

const Pagination = ({ page, totalPages, prevPage, nextPage, changePage }: PaginationProps) => {
    const pagesArray = useMemo(() => {
        const arr = [];
        for (let i = 0; i < totalPages; i++) {
            arr.push(i + 1);
        }
        return arr;
    }, [totalPages]);

    return (
        <nav className={classes.pagination} aria-label="page navigation">
            <button disabled={page <= 1} className={classes.paginationBtn} onClick={prevPage}>
                Prev
            </button>
            {pagesArray.map((p) => (
                <button
                    onClick={() => changePage(p)}
                    key={p}
                    className={clsx(classes.page, page === p && classes.pageCurrent)}
                >
                    {p}
                </button>
            ))}
            <button disabled={page >= totalPages} className={classes.paginationBtn} onClick={nextPage}>
                Next
            </button>
        </nav>
    );
};

export default Pagination;
