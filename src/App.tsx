import { Component } from 'react';

import SearchBar from './components/SearchBar/SearchBar.tsx';
import ItemList from './components/ItemsList/ItemList.tsx';
import Footer from './components/Footer/Footer.tsx';

import { API, SEARCH_TERM_STORAGE_KEY, SEARCH_VALUE_STORAGE_KEY } from './constants/constants.ts';

export default class App extends Component {
    state = {
        search: API,
    };

    handleInput = (input: string) => {
        const searchTerm = `${API}?search=${input.trim().toLowerCase()}`;
        localStorage.setItem(SEARCH_TERM_STORAGE_KEY, searchTerm);
        this.setState({ search: searchTerm });
    };

    handleRefresh = () => {
        localStorage.setItem(SEARCH_TERM_STORAGE_KEY, this.state.search);
    };

    componentDidMount(): void {
        const initialValue = localStorage.getItem(SEARCH_VALUE_STORAGE_KEY)
            ? localStorage.getItem(SEARCH_TERM_STORAGE_KEY)
            : API;
        if (initialValue) {
            this.setState({ search: initialValue });
        }
        window.addEventListener('beforeunload', this.handleRefresh);
    }

    componentWillUnmount(): void {
        localStorage.setItem(SEARCH_TERM_STORAGE_KEY, this.state.search);
        window.removeEventListener('beforeunload', this.handleRefresh);
    }

    render() {
        return (
            <>
                <SearchBar handleInput={this.handleInput} />
                <main className="container">
                    <ItemList searchTerm={this.state.search} />
                </main>
                <Footer />
            </>
        );
    }
}
