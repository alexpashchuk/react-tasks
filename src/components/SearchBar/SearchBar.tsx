import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import LogoSearch from '~assets/images/search.svg';
import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';
import classes from './searchBar.module.css';
import { useSearchParams } from 'react-router-dom';

type SearchBarProps = {
    handleInput: (input: string) => void;
    searchTerm: string;
};

const SearchBar = (props: SearchBarProps) => {
    const { handleInput, searchTerm } = props;

    const [searchValue, setSearchValue] = useState(searchTerm);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams({ name: searchValue });
        handleInput(searchValue);
    };

    useEffect(() => {
        localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, searchValue);
        if (!searchValue.length) {
            searchParams.delete('name');
            setSearchParams(searchParams);
            handleInput(searchValue);
        }
    }, [handleInput, searchParams, searchValue, setSearchParams]);

    return (
        <form className={classes.wrapper} onSubmit={(e) => handleFormSubmit(e)}>
            <input
                className={classes.input}
                type="search"
                required={true}
                autoComplete="off"
                value={searchValue}
                onChange={(e) => {
                    handleSearchChange(e);
                }}
            />
            <label className={classes.label}>Search</label>
            <button className={classes.button} type="submit">
                <LogoSearch className={classes.logo} />
            </button>
        </form>
    );
};

export default SearchBar;
