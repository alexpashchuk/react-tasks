import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { BASE_URL } from '~constants/constants.ts';
import { useAnimeContext } from '~context/animeContext.tsx';
import { fetchData } from '../api/api.tsx';

export const useAnimeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pageQuery = parseInt(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('search') || '';
  const perPageQuery = searchParams.get('per_page') || '20';
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data, setData } = useAnimeContext();
  const [totalPages, setTotalPages] = useState(1);
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

  useEffect(() => {
    const fetchAnime = async () => {
      setIsLoadingData(true);
      try {
        const url = `${BASE_URL}?page=${pageQuery}&q=${searchQuery.trim().toLowerCase()}&limit=${
          initialPageSize ? perPageQuery : '20'
        }`;
        const dataResponse = await fetchData(url);
        if (dataResponse.error) {
          setTotalPages(1);
          setData([]);
          setError(dataResponse.error);
        } else {
          setError(null);
          setTotalPages(dataResponse.pagination.last_visible_page);
          setData(dataResponse.data);
        }
      } catch (error) {
        setTotalPages(1);
        setData([]);
        if (typeof error === 'string') {
          setError(error);
        } else if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchAnime();
  }, [initialPageSize, pageQuery, perPageQuery, searchQuery, setData]);

  return {
    isLoading: isLoadingData,
    error,
    data,
    setIsLoadingImage,
    isLoadingImage,
    totalPages,
    pageQuery,
  };
};
