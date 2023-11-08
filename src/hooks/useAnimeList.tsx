import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { BASE_URL } from '~constants/constants.ts';
import { Character } from '~types/types.ts';
import { ListCharactersProps } from '~components/ListCharacters/ListCharacters.tsx';

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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(2554);
  const initialPage = pageQuery <= 0 || pageQuery > totalPages || isNaN(pageQuery);
  const [page, setPage] = useState(initialPage ? 1 : pageQuery);
  // const [params, setParams] = useState<Params>({ search: searchQuery, page: pageQuery });

  // display correct page
  const currentPage = useMemo(() => {
    if (isPage) {
      setPage(pageQuery);
      return pageQuery;
    } else {
      return page;
    }
  }, [isPage, page, pageQuery]);

  // set /characters?page=1 by default
  useEffect(() => {
    if (location.pathname === '/characters' && !location.search) {
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const url = `${BASE_URL}?page=${pageQuery}&q=${searchQuery.trim().toLowerCase()}&limit=${perPageQuery}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          setTotalPages(1);
          setCharacters([]);
        } else {
          setTotalPages(data.pagination.last_visible_page);
          setCharacters([...data.data]);
        }
      } catch {
        setError(true);
        setTotalPages(1);
        setCharacters([]);
      } finally {
        setIsLoadingData(false);
      }
    };
    if (!skip) {
      fetchData();
    }
  }, [skip, pageQuery, searchQuery, setTotalPages, perPageQuery]);

  return {
    isLoading: isLoadingData,
    error,
    characters,
    setIsLoadingImage,
    isLoadingImage,
    totalPages,
    pageQuery,
    currentPage,
  };
};
