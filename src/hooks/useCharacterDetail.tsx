import { useEffect, useState } from 'react';
import { BASE_URL } from '~constants/constants.ts';
import { Character } from '~types/types.ts';
import { useParams } from 'react-router-dom';

export const useCharacterDetail = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState(false);
  const [character, setCharacter] = useState<Character>();
  const { id } = useParams();

  useEffect(() => {
    setIsLoadingData(true);
    (async () => {
      try {
        const url = `${BASE_URL}/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setCharacter(data);
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
    character,
    setIsLoadingImage,
    isLoadingImage,
  };
};
