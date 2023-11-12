import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';

import placeholder from '~assets/icons/placeholder.jpg';
import { useAnimeDetail } from '~hooks/useAnimeDetail.tsx';
import { OutletContext } from '~components/AnimeRoot/animeRoot.tsx';
import Spinner from '~components/Spinner/spinner.tsx';

import classes from './animeDetail.module.css';

const AnimeDetail = () => {
  const { isLoading, error, data, setIsLoadingImage, isLoadingImage } = useAnimeDetail();
  const { images, title, status, rank, year, episodes, source, season, rating, duration, airing, mal_id } = data || {};

  const { handleCloseDetails } = useOutletContext<OutletContext>();

  if (error) {
    return (
      <div className={classes.detail}>
        <p className={classes.notFound}>{error} 🥺</p>
      </div>
    );
  }

  const statusClass = airing ? classes.airing : classes.completed;

  return (
    <div data-testid={`details${mal_id}`} className={classes.detail}>
      {isLoading && (
        <div data-testid="spinner">
          <Spinner dataTest="spinner" />
        </div>
      )}
      <img
        src={images?.jpg.large_image_url || placeholder}
        alt={`Title ${title}`}
        className={classes.image}
        draggable={false}
        onLoad={() => {
          setIsLoadingImage(true);
        }}
        style={!isLoadingImage ? { opacity: 0 } : { opacity: 1 }}
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
        <button data-testid="close" className={clsx('button', classes.closeBtn)} onClick={handleCloseDetails}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AnimeDetail;
