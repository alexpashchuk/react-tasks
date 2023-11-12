import { useSearchParams } from 'react-router-dom';

import placeholder from '~assets/icons/placeholder.jpg';
import Spinner from '~components/Spinner/spinner.tsx';
import { Anime } from '~types/types.ts';

import classes from './animeCard.module.css';

type AnimeCardProps = {
  anime: Anime;
  setIsLoadingImage: (b: boolean) => void;
  isLoadingImage: boolean;
};

const AnimeCard = (props: AnimeCardProps) => {
  const { anime, setIsLoadingImage, isLoadingImage } = props;
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
