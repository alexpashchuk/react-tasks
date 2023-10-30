import { Component } from 'react';

import SearchBar from './components/SearchBar/SearchBar.tsx';
import ItemList from './components/ItemsList/ItemList.tsx';
import Footer from './components/Footer/Footer.tsx';
import ButtonError from './components/ButtonError/ButtonError.tsx';
import { SEARCH_TERM_STORAGE_KEY } from './constants/constants.ts';

export default class App extends Component {
  state = {
    searchTerm: localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || '',
  };

  handleInput = (input: string) => {
    this.setState({ searchTerm: input });
  };

  render() {
    return (
      <>
        <ButtonError />
        <SearchBar handleInput={this.handleInput} />
        <main className="container">
          <ItemList searchTerm={this.state.searchTerm} />
        </main>
        <Footer />
      </>
    );
  }
}
