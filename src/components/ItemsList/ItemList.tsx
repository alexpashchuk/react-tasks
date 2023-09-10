import { Component } from 'react';

import Item, { Person } from '../Item/Item.tsx';
import Spinner from '../Spinner/Spinner.tsx';

import classes from './itemList.module.css';

type ItemListProps = {
    searchTerm: string;
};

interface ItemListState {
    count: number;
    next: string;
    previous?: null | string;
    results: Person[];
    isLoading: boolean;
}

export default class ItemList extends Component<ItemListProps, ItemListState> {
    state: ItemListState = {
        count: 0,
        next: '',
        previous: '',
        results: [],
        isLoading: false,
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        const response = await fetch(this.props.searchTerm);
        const data = await response.json();
        this.setState({ ...data, isLoading: false });
    }

    async componentDidUpdate(prevProps: ItemListProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.setState({ isLoading: true });
            const response = await fetch(this.props.searchTerm);
            const data = await response.json();
            this.setState({ ...data, isLoading: false });
        }
    }

    render() {
        const { results, isLoading } = this.state;
        if (isLoading) {
            return <Spinner />;
        }

        return (
            <>
                {results.length > 0 ? (
                    <div className={classes.wrapper}>
                        {results.map((person) => (
                            <Item key={person.name} data={person} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className={classes.notFound}>Not Found 🙄</p>
                    </div>
                )}
            </>
        );
    }
}
