import { Outlet, useSearchParams } from 'react-router-dom';

import AnimeList from '~components/AnimeList/animeList.tsx';
import SearchBar from '~components/SearchBar/searchBar.tsx';

import classes from './animeRoot.module.css';

export type OutletContext = {
  handleCloseDetails: () => void;
};

const AnimeRoot = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('details');

  const handleCloseDetails = () => {
    setSearchParams((searchParams) => {
      searchParams.delete('details');
      return searchParams;
    });
  };

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
