import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import LogoSearch from '@/assets/icons/search.svg';

import classes from './searchBar.module.css';

const SearchBar = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const [isActiveLabel, setIsActiveLabel] = useState(false);
  const [inputValue, setInputValue] = useState(query.search || '');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
