import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Anime } from '~types/types.ts';
import { fetchDataId } from '../api/api.tsx';

export const useAnimeDetail = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const [data, setData] = useState<Anime | null>(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details') || '';

  useEffect(() => {
    setIsLoadingData(true);
    const fetchAnimeDetails = async () => {
      try {
        const dataResponse = await fetchDataId(id);
        if (dataResponse?.status === '429' || dataResponse?.status === 404) {
          setData(null);
          setError(dataResponse?.message);
        } else {
          setError(null);
          setData(dataResponse.data);
        }
      } catch (error) {
        setData(null);
        if (typeof error === 'string') {
          setError(error);
        } else if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchAnimeDetails();
  }, [id]);

  return {
    isLoading: isLoadingData || !isLoadingImage,
    error,
    data,
    setIsLoadingImage,
    isLoadingImage,
  };
};
