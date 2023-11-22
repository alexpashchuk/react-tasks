import { Outlet, useSearchParams } from 'react-router-dom';

import AnimeList from '@/components/AnimeList/animeList';
import SearchBar from '@/components/SearchBar/searchBar';

import classes from './animeRoot.module.css';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { setViewMode } from '@/redux/slices/viewModeSlice';

export type OutletContext = {
  handleCloseDetails: () => void;
};

const AnimeRoot = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const id = searchParams.get('details');

  const handleCloseDetails = () => {
    setSearchParams((searchParams) => {
      searchParams.delete('details');
      return searchParams;
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(setViewMode('details'));
    } else {
      dispatch(setViewMode('root'));
    }
  }, [dispatch, id]);

  const outletClass = id ? classes.outlet_open : classes.outlet_close;
  const maskClass = id ? classes.mask_open : classes.mask_close;

  return (
    <main className={classes.root}>
      <div className={classes.result}>
        <SearchBar />
        <AnimeList />
      </div>
      <div className={outletClass}>{id ? <Outlet context={{ handleCloseDetails } satisfies OutletContext} /> : ''}</div>
      <div className={maskClass} onClick={handleCloseDetails}></div>
    </main>
  );
};

export default AnimeRoot;
