import { Character } from '~types/types.ts';
import placeholder from '~assets/icons/placeholder.jpg';
import Spinner from '~components/Spinner/spinner.tsx';

import classes from './animeCard.module.css';

type ItemProps = {
  character: Character;
  setIsLoadingImage: (b: boolean) => void;
  onToggle: (s: string | number) => void;
  isLoadingImage: boolean;
};

const AnimeCard = (props: ItemProps) => {
  const { character, onToggle, setIsLoadingImage, isLoadingImage } = props;
  const { title, images, mal_id } = character;

  return (
    <button className={classes.card} onClick={() => onToggle(`details/${mal_id}`)}>
      {!isLoadingImage && <Spinner />}
      <img
        src={images.jpg.large_image_url || placeholder}
        alt={`Title ${title}`}
        className={classes.image}
        draggable={false}
        onLoad={() => {
          setIsLoadingImage(true);
        }}
        style={!isLoadingImage ? { opacity: 0 } : { opacity: 1 }}
      />
      <h3 title={title} className={classes.name}>
        {title}
      </h3>
    </button>
  );
};

export default AnimeCard;
