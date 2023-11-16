import { useSearchParams } from 'react-router-dom';

import placeholder from '~assets/icons/placeholder.jpg';
import { IAnime } from '~types/types.ts';

import classes from './animeCard.module.css';

type AnimeCardProps = {
  anime: IAnime;
};

const AnimeCard = (props: AnimeCardProps) => {
  const { anime } = props;
  const { title, images, mal_id } = anime;
  const [, setSearchParams] = useSearchParams();

  const handleOpenDetails = () => {
    setSearchParams((searchParams) => {
      searchParams.set('details', mal_id.toString());
      return searchParams;
    });
  };

  return (
    <button data-testid={`card${mal_id}`} className={classes.card} onClick={handleOpenDetails}>
      <img
        src={images?.webp.large_image_url || placeholder}
        alt={`Title ${title}`}
        className={classes.image}
        draggable={false}
      />
      <h3 title={title} className={classes.name}>
        {title}
      </h3>
    </button>
  );
};

export default AnimeCard;
