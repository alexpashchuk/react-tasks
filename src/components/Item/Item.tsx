import { Component } from 'react';

import classes from './item.module.css';
interface ItemProps {
  data: Person;
}
export interface Person {
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

export default class Item extends Component<ItemProps> {
  render() {
    const { name, height, mass, birth_year, gender } = this.props.data;

    return (
      <div className={classes.card}>
        <h3>Character: {name}</h3>
        <p>Height:{height}</p>
        <p>Mass:{mass}</p>
        <p>Birth Year:{birth_year}</p>
        <p>Gender:{gender}</p>
      </div>
    );
  }
}
