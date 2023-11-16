import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useGetAnimeListQuery } from '~redux/services/animeService.tsx';

export const useAnimeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pageQuery = parseInt(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('search') || '';
  const perPageQuery = searchParams.get('per_page') || '20';
  const initialPageSize =
    perPageQuery === '20' ||
    perPageQuery === '20' ||
    perPageQuery === '15' ||
    perPageQuery === '10' ||
    perPageQuery === '5';

  // set /?page=1 and per_page=20 by default
  useEffect(() => {
    if (location.pathname === '/' && !location.search) {
      searchParams.set('page', '1');
      searchParams.set('per_page', '20');
      setSearchParams(searchParams);
    }
  }, [location.pathname, location.search, searchParams, setSearchParams]);

  // correct behavior when changing per_page in query param
  useEffect(() => {
    if (!initialPageSize) {
      searchParams.set('per_page', '20');
      setSearchParams(searchParams);
    }
  }, [initialPageSize, searchParams, setSearchParams]);

  const { data, isLoading, isError } = useGetAnimeListQuery({
    pageQuery,
    searchQuery,
    perPageQuery,
    initialPageSize,
  });

  return {
    isLoading,
    isError,
    data: data?.data || [],
    totalPages: data?.pagination.last_visible_page || 1,
    pageQuery,
  };
};
