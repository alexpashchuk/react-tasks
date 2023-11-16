import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAnimeDetailQuery } from '~redux/services/animeService.tsx';

export const useAnimeDetail = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details') || '';

  const { data, isLoading, isError } = useGetAnimeDetailQuery(id);

  return {
    isLoading: isLoading || !isLoadingImage,
    isError,
    data: data?.data,
    setIsLoadingImage,
    isLoadingImage,
  };
};
