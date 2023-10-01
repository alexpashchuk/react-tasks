import { useCallback, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { DETAILS_QUERY_STORAGE_KEY, SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';

import SearchBar from '../SearchBar/SearchBar.tsx';
import ListCharacters from '../ListCharacters/ListCharacters.tsx';
import classes from './charactersRoot.module.css';

export type OutletContext = {
    onToggle: (to: string) => void;
};

const CharactersRoot = () => {
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem(SEARCH_VALUE_STORAGE_KEY) || '');
    const [page, setPage] = useState(1);
    // const [isOpen, setIsOpen] = useState(false);
    // const [isOpen, setIsOpen] = useState(localStorage.getItem(DETAILS_QUERY_STORAGE_KEY) || '/characters');
    const navigate = useNavigate();
    const params = useParams();

    const handleInput = (input: string) => {
        setSearchTerm(input);
    };

    const onToggle = useCallback(
        (to: string) => {
            navigate(to);
            // setIsOpen((prev) => !prev);
            // setIsOpen(to);
            // localStorage.setItem(DETAILS_QUERY_STORAGE_KEY, to);
        },
        [navigate]
    );

    const outletClass = params?.id ? classes.outlet_open : classes.outlet_close;
    const maskClass = params?.id ? classes.mask_open : classes.mask_close;

    return (
        <div className={classes.root}>
            <div className={classes.result}>
                <SearchBar searchTerm={searchTerm} handleInput={handleInput} />
                <ListCharacters searchTerm={searchTerm} page={page} onToggle={onToggle} />
            </div>
            <div className={outletClass}>
                <Outlet context={{ onToggle } satisfies OutletContext} />
            </div>
            <div className={maskClass} onClick={() => onToggle('/characters')}></div>
        </div>
    );
};

export default CharactersRoot;
