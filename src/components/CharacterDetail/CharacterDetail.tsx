import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';

import { useCharacterDetail } from '~hooks/useCharacterDetail.tsx';
import { OutletContext } from '~components/CharactersRoot/CharactersRoot.tsx';
import placeholder from '~assets/icons/placeholder.jpg';

import Spinner from '../Spinner/Spinner.tsx';
import classes from './CharacterDetail.module.css';

const CharacterDetail = () => {
    const { isLoading, error, character, setIsLoadingImage, isLoadingImage } = useCharacterDetail();
    const { name, image, gender, status, type, origin, species, location: lastLocation } = character || {};

    const { onToggle } = useOutletContext<OutletContext>();

    const statusClass = status === 'Dead' ? classes.dead : status === 'Alive' ? classes.alive : classes.unknown;

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
                src={image || placeholder}
                alt={`Character ${name}`}
                className={classes.image}
                draggable={false}
                onLoad={() => {
                    setIsLoadingImage(true);
                }}
                style={!isLoadingImage ? { opacity: 0 } : { opacity: 1 }}
            />
            <div className={classes.info}>
                <h2 className={classes.name}>{name}</h2>
                <p className={clsx(classes.status, statusClass)}>{status}</p>
                <div className={classes.text}>
                    <p>species:</p>
                    {species}
                </div>
                <div className={classes.text}>
                    <p>gender:</p>
                    {gender}
                </div>
                <div className={classes.text}>
                    <p>location:</p>
                    {lastLocation?.name}
                </div>
                <div className={classes.text}>
                    <p>planet:</p>
                    {origin?.name}
                </div>
                {type && (
                    <div className={classes.text}>
                        <p>type:</p>
                        {type}
                    </div>
                )}
                <button className={clsx('button', classes.closeBtn)} onClick={() => onToggle(-1)}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default CharacterDetail;
