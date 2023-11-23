import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

import { selectSearchValue, setSearch } from '@/redux/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

import LogoSearch from '@/assets/icons/search.svg';

import classes from './searchBar.module.css';
import { SEARCH_VALUE_STORAGE_KEY } from '@/constants/constants';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [isActiveLabel, setIsActiveLabel] = useState(false);
  // const dispatch = useAppDispatch();
  // const searchValue = useAppSelector(selectSearchValue);
  const router = useRouter();
  const { pathname, query } = router;
  const [inputValue, setInputValue] = useState(query.search || '');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(setSearch(inputValue));
    query.page = '1';
    query.search = inputValue;

    if (!inputValue.length) {
      delete query.search;
    }

    router.push({ pathname, query: { ...query } }, undefined, { scroll: false });
  };

  useEffect(() => {
    if (inputValue) {
      setIsActiveLabel(true);
    } else {
      setIsActiveLabel(false);
    }
  }, [inputValue]);

  return (
    <form
      className={classes.wrapper}
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
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
