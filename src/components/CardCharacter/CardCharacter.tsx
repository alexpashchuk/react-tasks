import { Link, useNavigate } from 'react-router-dom';
import { Character } from '~types/types.ts';

import classes from './CardCharacter.module.css';

type ItemProps = {
    character: Character;
};

const CardCharacter = (props: ItemProps) => {
    const { character } = props;
    const { name, image, id } = character;

    return (
        <Link className={classes.card} to={`${id}`}>
            <img src={image} alt={`Image ${name}`} />
            <h3 className={classes.name}>{name}</h3>
        </Link>
    );
};

export default CardCharacter;
