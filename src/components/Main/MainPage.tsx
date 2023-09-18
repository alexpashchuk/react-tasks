import SearchBar from '../SearchBar/SearchBar.tsx';
import ItemList from '../ItemsList/ItemList.tsx';
// import { useState } from 'react';
// import { SEARCH_VALUE_STORAGE_KEY } from '../../constants/constants.ts';
// import { useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

const MainPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    // const [query, setQuery] = useState('');
    // const handleInput = (input: string) => {
    //     setQuery(input);
    // };

    return (
        <div>
            <SearchBar
                // handleInput={handleInput}
                query={query}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
            />
            <ItemList query={query} />
            <Outlet />
        </div>
    );
};

export default MainPage;
