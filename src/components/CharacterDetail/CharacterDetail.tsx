import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';

import { useCharacterDetail } from '~hooks/useCharacterDetail.tsx';
import { OutletContext } from '~components/CharactersRoot/CharactersRoot.tsx';
import placeholder from '~assets/icons/placeholder.jpg';

import Spinner from '../Spinner/Spinner.tsx';
import classes from './CharacterDetail.module.css';

const CharacterDetail = () => {
  const { isLoading, error, character, setIsLoadingImage, isLoadingImage } = useCharacterDetail();
  const { images, title, status, rank, year, episodes, source, season, rating, duration } = character || {};

  const { onToggle } = useOutletContext<OutletContext>();

  if (error) {
    return (
      <div className={classes.detail}>
        <p className={classes.notFound}>Fetch Error 🥺</p>
      </div>
    );
  }

  return (
    <div className={classes.detail}>
      {isLoading && <Spinner />}
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
        <p className={classes.status}>{status}</p>
        <div className={classes.text}>
          <p>Rank:</p>
          {rank}
        </div>
        {year && (
          <div className={classes.text}>
            <p>Year:</p>
            {year}
          </div>
        )}
        <div className={classes.text}>
          <p>Episodes:</p>
          {episodes}
        </div>
        <div className={classes.text}>
          <p>Source:</p>
          {source}
        </div>
        <div className={classes.text}>
          <p>Season:</p>
          {season}
        </div>
        <div className={classes.text}>
          <p>Rating:</p>
          {rating}
        </div>
        <div className={classes.text}>
          <p>Duration:</p>
          {duration}
        </div>
        <button className={clsx('button', classes.closeBtn)} onClick={() => onToggle(-1)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CharacterDetail;
