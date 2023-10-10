import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

import LogoSearch from '~assets/images/search.svg';
import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';

import classes from './searchBar.module.css';

type SearchBarProps = {
    setSkip: (s: boolean) => void;
};
const SearchBar = ({ setSkip }: SearchBarProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [searchValue, setSearchValue] = useState(searchQuery);
    const [isActiveLabel, setIsActiveLabel] = useState(false);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        setSkip(false);
        e.preventDefault();
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
