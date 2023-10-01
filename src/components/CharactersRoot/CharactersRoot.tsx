import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ListCharacters from '../ListCharacters/ListCharacters.tsx';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import classes from './charactersRoot.module.css';
import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';

const CharactersRoot = () => {
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem(SEARCH_VALUE_STORAGE_KEY) || '');
    const [page, setPage] = useState(1);
    const handleInput = (input: string) => {
        setSearchTerm(input);
    };

    return (
        <div className={classes.root}>
            <div className={classes.result}>
                <SearchBar searchTerm={searchTerm} handleInput={handleInput} />
                <ListCharacters searchTerm={searchTerm} page={page} />
            </div>
            {/*<div className={classes.outlet}>*/}
            <Outlet />
            {/*</div>*/}
        </div>
    );
};

export default CharactersRoot;
