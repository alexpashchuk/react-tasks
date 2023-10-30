import { Component } from 'react';

import Item, { Person } from '../Item/Item.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import { BASE_URL } from '../../constants/constants.ts';

import classes from './itemList.module.css';

type ItemListProps = {
  searchTerm: string;
};

interface ItemListState {
  results: Person[];
  isLoading: boolean;
}

export default class ItemList extends Component<ItemListProps, ItemListState> {
  state: ItemListState = {
    results: [],
    isLoading: false,
  };

  fetchData = async () => {
    const fetchURL = `${BASE_URL}?search=${this.props.searchTerm.trim().toLowerCase()}`;

    this.setState({ isLoading: true });
    const response = await fetch(fetchURL);
    const data = await response.json();
    this.setState({ results: data.results, isLoading: false });
  };

  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps: ItemListProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData();
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
