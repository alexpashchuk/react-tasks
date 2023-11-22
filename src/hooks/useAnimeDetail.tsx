import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { setLoadingDetails } from '@/redux/slices/loadingSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useGetAnimeDetailQuery } from '@/redux/services/animeService';

export const useAnimeDetail = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details') || '';

  const { data, isLoading, isFetching, isError } = useGetAnimeDetailQuery(id);

  useEffect(() => {
    dispatch(setLoadingDetails(isLoading));
  }, [dispatch, isLoading]);

  return {
    isLoading: isLoading || !isLoadingImage || isFetching,
    isError,
    data: data?.data,
    setIsLoadingImage,
    isLoadingImage,
  };
};
