import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import LogoSearch from '../../assets/images/search.svg';
// import CloseIcon from '../../assets/images/close.svg';
import { SEARCH_VALUE_STORAGE_KEY } from '../../constants/constants.ts';

import classes from './searchBar.module.css';
import { SetURLSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

type SearchBarProps = {
    // handleInput: (input: string) => void;
    query: string;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
};

const SearchBar = (props: SearchBarProps) => {
    const { query, searchParams, setSearchParams } = props;

    const [searchValue, setSearchValue] = useState<string>(query);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams({ search: searchValue });
    };

    useEffect(() => {
        localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, searchValue);
        if (!searchValue.length) {
            searchParams.delete('search');
            setSearchParams(searchParams);
        }
    }, [searchParams, searchValue, setSearchParams]);

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
            {/*<button onClick={this.resetInputField} type="reset" className={classes.reset}>*/}
            {/*    <CloseIcon className={classes.logo} />*/}
            {/*</button>*/}
        </form>
    );
};

export default SearchBar;
