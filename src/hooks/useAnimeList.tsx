import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { BASE_URL } from '~constants/constants.ts';
import { Anime } from '~types/types.ts';
import { ListCharactersProps } from '~components/AnimeList/animeList.tsx';

export const useAnimeList = ({ skip }: ListCharactersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pageQuery = parseInt(searchParams.get('page') || '1');
  const isPage = searchParams.get('page') || '';
  const searchQuery = searchParams.get('search') || '';
  const perPageQuery = searchParams.get('per_page') || '20';
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Anime[]>([]);
  const [totalPages, setTotalPages] = useState(2554);
  const initialPage = pageQuery <= 0 || pageQuery > totalPages || isNaN(pageQuery);
  const initialPageSize =
    perPageQuery === '20' ||
    perPageQuery === '20' ||
    perPageQuery === '15' ||
    perPageQuery === '10' ||
    perPageQuery === '5';
  const [page, setPage] = useState(initialPage ? 1 : pageQuery);

  // display correct page
  const currentPage = useMemo(() => {
    if (isPage) {
      setPage(pageQuery);
      return pageQuery;
    } else {
      return page;
    }
  }, [isPage, page, pageQuery]);

  // set /?page=1 by default
  useEffect(() => {
    if (location.pathname === '/' && !location.search) {
      searchParams.set('page', '1');
      searchParams.set('per_page', '20');
      setSearchParams(searchParams);
    }
  }, [location.pathname, location.search, searchParams, setSearchParams]);

  // correct behavior when changing pages in query param
  useEffect(() => {
    if (initialPage) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [initialPage, searchParams, setSearchParams]);

  // correct behavior when changing per_page in query param
  useEffect(() => {
    if (!initialPageSize) {
      searchParams.set('per_page', '20');
      setSearchParams(searchParams);
    }
  }, [initialPageSize, searchParams, setSearchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const url = `${BASE_URL}?page=${pageQuery}&q=${searchQuery.trim().toLowerCase()}&limit=${perPageQuery}`;
        const response = await fetch(url);
        const dataResponse = await response.json();
        if (dataResponse.error) {
          setTotalPages(1);
          setData([]);
        } else {
          setTotalPages(dataResponse.pagination.last_visible_page);
          setData(dataResponse.data);
        }
      } catch {
        setError(true);
        setTotalPages(1);
        setData([]);
      } finally {
        setIsLoadingData(false);
      }
    };
    // skip new API call when open detail page.
    if (!skip) {
      fetchData();
    }
  }, [skip, pageQuery, searchQuery, setTotalPages, perPageQuery]);

  return {
    isLoading: isLoadingData,
    error,
    data,
    setIsLoadingImage,
    isLoadingImage,
    totalPages,
    pageQuery,
    currentPage,
  };
};
