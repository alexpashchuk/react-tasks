import { useRouter } from 'next/router';
import Image from 'next/image';

import placeholder from '@/assets/icons/placeholder.jpg';
import { IAnime } from '@/types/types';
import { BLUR_DATA_URL } from '@/constants/constants';

import classes from './animeCard.module.css';

type AnimeCardProps = {
  anime: IAnime;
};

const AnimeCard = (props: AnimeCardProps) => {
  const { anime } = props;
  const { title, images, mal_id } = anime;

  const router = useRouter();
  const { pathname, query } = router;
  const handleOpenDetails = () => {
    router.push({
      pathname,
      query: {
        ...query,
        details: String(mal_id),
      },
    });
  };

  return (
    <button data-testid={`card${mal_id}`} className={classes.card} onClick={handleOpenDetails}>
      <Image
        src={images?.webp.image_url || placeholder}
        alt={`Title ${title}`}
        className={classes.image}
        draggable={false}
        width={204}
        height={204}
        placeholder={'blur'}
        blurDataURL={BLUR_DATA_URL}
      />
      <h3 title={title} className={classes.name}>
        {title}
      </h3>
    </button>
  );
};

export default AnimeCard;
