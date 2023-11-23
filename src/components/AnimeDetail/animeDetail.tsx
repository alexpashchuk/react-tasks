import Image from 'next/image';
import clsx from 'clsx';

import placeholder from '@/assets/icons/placeholder.jpg';
import { IAnime } from '@/types/types';
import { BLUR_DATA_URL } from '@/constants/constants';

import classes from './animeDetail.module.css';

type AnimeDetailProps = {
  data: IAnime;
  closeDetails: () => void;
};

const AnimeDetail = (props: AnimeDetailProps) => {
  const { data, closeDetails } = props;

  const { images, title, status, rank, year, episodes, source, season, rating, duration, airing, mal_id } = data || {};

  // if (isError) {
  //   return (
  //     <div className={classes.detail}>
  //       <p className={classes.notFound}>Failed to fetch 🥺</p>
  //     </div>
  //   );
  // }

  const statusClass = airing ? classes.airing : classes.completed;

  return (
    <div data-testid={`details${mal_id}`} className={classes.detail}>
      {/*{isLoading && <Spinner dataTest="spinner" />}*/}
      <Image
        src={images?.webp.large_image_url || placeholder}
        alt={`Title ${title}`}
        className={classes.image}
        draggable={false}
        width={278}
        height={278}
        placeholder={'blur'}
        blurDataURL={BLUR_DATA_URL}
      />
      <div className={classes.info}>
        <h2 className={classes.name}>{title}</h2>
        <p className={clsx(classes.status, statusClass)}>{status}</p>
        {rank && (
          <div className={classes.text}>
            <p>Rank:</p>
            {rank}
          </div>
        )}
        {year && (
          <div className={classes.text}>
            <p>Year:</p>
            {year}
          </div>
        )}
        {episodes && (
          <div className={classes.text}>
            <p>Episodes:</p>
            {episodes}
          </div>
        )}
        {source && (
          <div className={classes.text}>
            <p>Source:</p>
            {source}
          </div>
        )}
        {season && (
          <div className={classes.text}>
            <p>Season:</p>
            {season}
          </div>
        )}
        {rating && (
          <div className={classes.text}>
            <p>Rating:</p>
            {rating}
          </div>
        )}
        {duration && (
          <div className={classes.text}>
            <p>Duration:</p>
            {duration}
          </div>
        )}
        <button data-testid="close" className={clsx('button', classes.closeBtn)} onClick={closeDetails}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AnimeDetail;
