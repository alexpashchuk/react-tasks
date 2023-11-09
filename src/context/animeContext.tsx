import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';
import { Anime } from '~types/types.ts';

type AnimeContext = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  data: Anime[];
  setData: React.Dispatch<React.SetStateAction<Anime[]>>;
};

const AnimeContext = createContext<AnimeContext>({
  searchValue: '',
  setSearchValue: () => {},
  data: [],
  setData: () => {},
});

export const AnimeContextProvider = ({ children }: { children?: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [data, setData] = useState<Anime[]>([]);

  const value = useMemo(() => ({ searchValue, setSearchValue, data, setData }), [data, searchValue]);

  useEffect(() => {
    localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, searchValue);
  }, [searchValue]);

  return <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>;
};

export const useAnimeContext = () => useContext(AnimeContext);
