import { ChangeEvent, Component, FormEvent } from 'react';

import LogoSearch from '../../assets/images/search.svg';
import { SEARCH_TERM_STORAGE_KEY } from '../../constants/constants.ts';

import classes from './searchBar.module.css';

type SearchBarProps = {
  handleInput: (input: string) => void;
};

type SearchBarState = {
  searchTerm: string;
};

export default class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = {
    searchTerm: localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || '',
  };

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, value);
    this.setState({ searchTerm: value });
  };

  handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.handleInput(this.state.searchTerm);
  };

  handleRefresh = () => {
    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, this.state.searchTerm);
  };

  componentDidMount(): void {
    const initialValue = localStorage.getItem(SEARCH_TERM_STORAGE_KEY);
    if (initialValue) {
      this.setState({ searchTerm: initialValue });
    }
    window.addEventListener('beforeunload', this.handleRefresh);
  }

  componentWillUnmount(): void {
    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, this.state.searchTerm);
    window.removeEventListener('beforeunload', this.handleRefresh);
  }

  render() {
    return (
      <form className={classes.wrapper} onSubmit={(e) => this.handleFormSubmit(e)}>
        <input
          className={classes.input}
          type="search"
          autoComplete="off"
          placeholder="Search"
          value={this.state.searchTerm}
          onChange={(e) => {
            this.handleSearchChange(e);
          }}
        />
        <button className={classes.button} type="submit">
          <LogoSearch className={classes.logo} />
        </button>
      </form>
    );
  }
}
