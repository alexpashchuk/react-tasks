import { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import { API, SEARCH_TERM_STORAGE_KEY } from '../../constants/constants.ts';
import ItemList from '../ItemsList/ItemList.tsx';

export default class HomePage extends Component {
    state = {
        search: localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || API,
    };

    handleInput = (input: string) => {
        const searchTerm = `${API}?search=${input.trim().toLowerCase()}`;
        localStorage.setItem(SEARCH_TERM_STORAGE_KEY, searchTerm);
        this.setState({ search: searchTerm });
    };

    render() {
        return (
            <div>
                <SearchBar handleInput={this.handleInput} />
                <ItemList searchTerm={this.state.search} />
            </div>
        );
    }
}
