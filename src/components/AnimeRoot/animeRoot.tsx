import { useCallback, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import SearchBar from '../SearchBar/searchBar.tsx';
import AnimeList from '~components/AnimeList/animeList.tsx';
import classes from './animeRoot.module.css';

export type OutletContext = {
  onToggle: (t: number | string) => void;
};

const AnimeRoot = () => {
  const [skip, setSkip] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const onToggle = useCallback(
    (toOrDelta: string | number) => {
      setSkip(true);
      if (typeof toOrDelta === 'string') {
        navigate(toOrDelta);
      } else {
        navigate(toOrDelta);
      }
    },
    [navigate]
  );

  const outletClass = params?.id ? classes.outlet_open : classes.outlet_close;
  const maskClass = params?.id ? classes.mask_open : classes.mask_close;

  return (
    <main className={classes.root}>
      <div className={classes.result}>
        <SearchBar setSkip={setSkip} />
        <AnimeList skip={skip} setSkip={setSkip} onToggle={onToggle} />
      </div>
      <div className={outletClass}>
        <Outlet context={{ onToggle } satisfies OutletContext} />
      </div>
      <div className={maskClass} onClick={() => onToggle(-1)}></div>
    </main>
  );
};

export default AnimeRoot;
