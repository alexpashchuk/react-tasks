import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

import LogoSearch from '~assets/icons/search.svg';
import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';
import { useAnimeContext } from '~context/animeContext.tsx';

import classes from './searchBar.module.css';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActiveLabel, setIsActiveLabel] = useState(false);
  const { searchValue, setSearchValue } = useAnimeContext();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If the user changes items on the page, make a new API call and display the results from the first page.
    searchParams.set('search', `${searchValue}`);
    searchParams.set('page', '1');
    if (!searchValue.length) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchValue) {
      setIsActiveLabel(true);
    } else {
      setIsActiveLabel(false);
    }
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, searchValue);
  }, [searchValue]);

  return (
    <form className={classes.wrapper} onSubmit={(e) => handleFormSubmit(e)}>
      <input
        className={classes.input}
        type="search"
        autoComplete="off"
        value={searchValue}
        onChange={(e) => {
          handleSearchChange(e);
        }}
      />
      <label className={clsx(classes.label, isActiveLabel ? classes.active : '')}>Search</label>
      <button className={clsx('button', classes.searchBtn)} type="submit">
        <LogoSearch className={classes.logo} />
      </button>
    </form>
  );
};

export default SearchBar;
