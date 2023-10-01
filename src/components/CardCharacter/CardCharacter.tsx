import { Character } from '~types/types.ts';
import placeholder from '~assets/images/placeholder.jpg';
import classes from './CardCharacter.module.css';
import Spinner from '~components/Spinner/Spinner.tsx';

type ItemProps = {
    character: Character;
    onToggle: (to: string) => void;
    setIsLoadingImage: (b: boolean) => void;
    isLoadingImage: boolean;
};

const CardCharacter = (props: ItemProps) => {
    const { character, onToggle, setIsLoadingImage, isLoadingImage } = props;
    const { name, image, id } = character;

    return (
        <button className={classes.card} onClick={() => onToggle(`details/${id}`)}>
            {!isLoadingImage && <Spinner />}
            <img
                src={image || placeholder}
                alt={`Character ${name}`}
                className={classes.image}
                draggable={false}
                onLoad={() => {
                    setIsLoadingImage(true);
                }}
                style={!isLoadingImage ? { opacity: 0 } : { opacity: 1 }}
            />
            <h3 className={classes.name}>{name}</h3>
        </button>
    );
};

export default CardCharacter;
