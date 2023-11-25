import { useMemo } from 'react';

import { PaginationProps } from '@/components/Pagination/pagination';
import { useRouter } from 'next/router';

export const usePagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const { pathname, query } = router;

  const pagesArray = useMemo(() => {
    const arr = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        arr.push(i + 1);
      }
    } else {
      let startPage = page - 2;
      let endPage = page + 2;
      if (startPage < 1) {
        endPage += Math.abs(startPage) + 1;
        startPage = 1;
      }
      if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
      }
      for (let i = startPage; i <= endPage; i++) {
        arr.push(i);
      }
    }
    return arr;
  }, [totalPages, page]);

  const prevFivePages = page > 5 ? page - 5 : 1;
  const nextFivePages = page + 5 > totalPages ? totalPages : page + 5;

  const handlePageChange = (page: number): void => {
    router.push(
      {
        pathname,
        query: {
          ...query,
          page: String(page),
        },
      },
      undefined,
      { scroll: false }
    );
  };

  return {
    page,
    totalPages,
    pagesArray,
    prevFivePages,
    nextFivePages,
    handlePageChange,
  };
};
