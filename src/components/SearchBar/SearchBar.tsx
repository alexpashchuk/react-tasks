import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

import LogoSearch from '~assets/images/search.svg';
import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';

import classes from './searchBar.module.css';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

type SearchBarProps = {
    handleInput: (input: string) => void;
    searchTerm: string;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
};

const SearchBar = (props: SearchBarProps) => {
    const { handleInput, searchTerm, searchParams, setSearchParams } = props;
    const [searchValue, setSearchValue] = useState(searchTerm);
    const [isActiveLabel, setIsActiveLabel] = useState(false);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleInput(searchValue);
        searchParams.set('page', '1');
        setSearchParams(searchParams, {
            replace: true,
        });
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
