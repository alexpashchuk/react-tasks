import classes from './item.module.css';

type ItemProps = {
    data: Person;
};

export type Person = {
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
};

const Item = (props: ItemProps) => {
    const { data } = props;
    const { name, height, mass, birth_year, gender } = data;

    return (
        <div className={classes.card}>
            <h3>Character: {name}</h3>
            <p>Height:{height}</p>
            <p>Mass:{mass}</p>
            <p>Birth Year:{birth_year}</p>
            <p>Gender:{gender}</p>
        </div>
    );
};

export default Item;
