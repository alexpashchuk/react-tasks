import { Character } from '~types/types.ts';
import placeholder from '~assets/icons/placeholder.jpg';
import Spinner from '~components/Spinner/Spinner.tsx';

import classes from './CardCharacter.module.css';

type ItemProps = {
  character: Character;
  setIsLoadingImage: (b: boolean) => void;
  onToggle: (s: string | number) => void;
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
      <h3 title={name} className={classes.name}>
        {name}
      </h3>
    </button>
  );
};

export default CardCharacter;
