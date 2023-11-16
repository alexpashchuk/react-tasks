import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetAnimeDetailQuery } from '~redux/services/animeService.tsx';
import { setLoadingDetails } from '~redux/slices/loadingDetailsSlice.tsx';
import { useAppDispatch } from '~redux/hooks/hooks.ts';

export const useAnimeDetail = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details') || '';

  const { data, isLoading, isError } = useGetAnimeDetailQuery(id);

  useEffect(() => {
    dispatch(setLoadingDetails(isLoading));
  }, [dispatch, isLoading]);

  return {
    isLoading: isLoading || !isLoadingImage,
    isError,
    data: data?.data,
    setIsLoadingImage,
    isLoadingImage,
  };
};
