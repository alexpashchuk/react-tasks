import { useCallback, useState } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar.tsx';
import ListCharacters from '../ListCharacters/ListCharacters.tsx';
import classes from './charactersRoot.module.css';
import { SEARCH_VALUE_STORAGE_KEY } from '~constants/constants.ts';

export type OutletContext = {
    onToggle: (to: string) => void;
};

const CharactersRoot = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem(SEARCH_VALUE_STORAGE_KEY) || '');

    const navigate = useNavigate();
    const params = useParams();

    const handleInput = (input: string) => {
        setSearchTerm(input);
    };

    const onToggle = useCallback(
        (to: string) => {
            navigate(to);
        },
        [navigate]
    );

    const outletClass = params?.id ? classes.outlet_open : classes.outlet_close;
    const maskClass = params?.id ? classes.mask_open : classes.mask_close;

    return (
        <div className={classes.root}>
            <div className={classes.result}>
                <SearchBar
                    searchTerm={searchTerm}
                    handleInput={handleInput}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
                <ListCharacters
                    searchTerm={searchTerm}
                    onToggle={onToggle}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
            </div>
            <div className={outletClass}>
                <Outlet context={{ onToggle } satisfies OutletContext} />
            </div>
            <div className={maskClass} onClick={() => onToggle('/characters')}></div>
        </div>
    );
};

export default CharactersRoot;
