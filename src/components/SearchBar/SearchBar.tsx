import { ChangeEvent, Component, FormEvent } from 'react';

import LogoSearch from '../../assets/images/search.svg';
// import CloseIcon from '../../assets/images/close.svg';
import { SEARCH_VALUE_STORAGE_KEY } from '../../constants/constants.ts';

import classes from './searchBar.module.css';

type SearchBarProps = {
    handleInput: (input: string) => void;
};

type SearchBarState = {
    searchValue: string;
};

export default class SearchBar extends Component<SearchBarProps, SearchBarState> {
    state = {
        searchValue: localStorage.getItem(SEARCH_VALUE_STORAGE_KEY) || '',
    };

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.setState({ searchValue: value });
    };

    handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.handleInput(this.state.searchValue);
        this.handleSearchSubmit();
    };

    handleSearchSubmit = () => {
        // this.setState({ searchValue: '' });
        localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, this.state.searchValue);
    };

    handleRefresh = () => {
        localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, this.state.searchValue);
    };

    resetInputField = () => {
        this.setState(
            () => ({
                searchValue: '',
            }),
            () => {
                localStorage.removeItem(SEARCH_VALUE_STORAGE_KEY);
                this.props.handleInput(this.state.searchValue);
            }
        );
    };

    componentDidMount(): void {
        const initialValue = localStorage.getItem(SEARCH_VALUE_STORAGE_KEY);
        if (initialValue) {
            this.setState({ searchValue: initialValue });
        }
        window.addEventListener('beforeunload', this.handleRefresh);
    }

    componentWillUnmount(): void {
        localStorage.setItem(SEARCH_VALUE_STORAGE_KEY, this.state.searchValue);
        window.removeEventListener('beforeunload', this.handleRefresh);
    }

    render() {
        return (
            <form className={classes.wrapper} onSubmit={(e) => this.handleFormSubmit(e)}>
                <input
                    className={classes.input}
                    type="search"
                    required={true}
                    autoComplete="off"
                    value={this.state.searchValue}
                    onChange={(e) => {
                        this.handleSearchChange(e);
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
    }
}
