import { useEffect, useState } from 'react';

import Item, { Person } from '../Item/Item.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import classes from './itemList.module.css';
import { API, SEARCH_QUERY } from '../../constants/constants.ts';

type ItemListProps = {
    query?: string;
};

type IState = {
    count: number;
    next: string;
    previous?: null | string;
    results: Person[];
};

const ItemList = (props: ItemListProps) => {
    const { query } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [state, setState] = useState<IState>();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const searchTerm = query ? `${API}${SEARCH_QUERY}${query.trim().toLowerCase()}` : API;
                const response = await fetch(searchTerm);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setState(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                    console.log(err.message);
                }
            }
            setIsLoading(false);
        })();
    }, [query]);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div>
                <p className={classes.notFound}>Fetch Error 🥺</p>
            </div>
        );
    }

    return (
        <>
            {state && state.results.length > 0 ? (
                <div data-testid="item" className={classes.wrapper}>
                    {state.results.map((person) => (
                        <Item key={person.name} data={person} />
                    ))}
                </div>
            ) : (
                <div data-testid="item">
                    <p className={classes.notFound}>Results Not Found 🙄</p>
                </div>
            )}
        </>
    );
};

export default ItemList;
