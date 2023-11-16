import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

import { selectSearchValue, setSearch } from '~redux/slices/searchSlice.tsx';
import { useAppDispatch, useAppSelector } from '~redux/hooks/hooks.ts';

import LogoSearch from '~assets/icons/search.svg';
import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';

import classes from './searchBar.module.css';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActiveLabel, setIsActiveLabel] = useState(false);
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);
  const [inputValue, setInputValue] = useState(searchValue);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, inputValue);
    dispatch(setSearch(inputValue));
    searchParams.set('search', `${inputValue}`);
    searchParams.set('page', '1');
    if (!inputValue.length) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (inputValue) {
      setIsActiveLabel(true);
    } else {
      setIsActiveLabel(false);
    }
  }, [inputValue]);

  return (
    <form className={classes.wrapper} onSubmit={(e) => handleFormSubmit(e)}>
      <input
        className={classes.input}
        type="search"
        autoComplete="off"
        value={inputValue}
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
