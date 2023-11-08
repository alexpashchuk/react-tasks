import { useEffect, useState } from 'react';
import { BASE_URL } from '~constants/constants.ts';
import { Anime } from '~types/types.ts';
import { useParams } from 'react-router-dom';

export const useAnimeDetail = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Anime>();
  const { id } = useParams();

  useEffect(() => {
    setIsLoadingData(true);
    (async () => {
      try {
        const url = `${BASE_URL}/${id}`;
        const response = await fetch(url);
        const dataResponse = await response.json();
        setData(dataResponse.data);
      } catch {
        setError(true);
      } finally {
        setIsLoadingData(false);
      }
    })();
  }, [id]);

  return {
    isLoading: isLoadingData || !isLoadingImage,
    error,
    data,
    setIsLoadingImage,
    isLoadingImage,
  };
};
