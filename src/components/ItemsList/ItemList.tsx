import { Component } from 'react';
import { API } from '../../constants/constants.ts';

type ItemListProps = {
    searchTerm: string;
};

interface ItemListState {
    count: number;
    next: string;
    previous?: null | string;
    results: Person[];
}

interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    species: string[];
    url: string;
}

export default class ItemList extends Component<ItemListProps, ItemListState> {
    state = {
        count: 0,
        next: '',
        previous: '',
        results: [],
    };

    async componentDidMount() {
        const response = await fetch(API);
        const data = await response.json();
        this.setState({ ...data });
    }

    async componentDidUpdate(prevProps: ItemListProps) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            const response = await fetch(this.props.searchTerm);
            const data = await response.json();
            this.setState({ ...data });
        }
    }

    render() {
        const { results } = this.state;
        return (
            <div>
                <h1>Lists</h1>
                <ul>
                    {results.map(({ name }) => (
                        <li key={name}>{name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
