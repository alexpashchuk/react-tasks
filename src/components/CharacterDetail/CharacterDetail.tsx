import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner.tsx';
import classes from './CharacterDetail.module.css';
import { useCharacterDetail } from '~hooks/useCharacterDetail.tsx';
import clsx from 'clsx';

const CharacterDetail = () => {
    const params = useParams();
    const { isLoading, error, character } = useCharacterDetail(String(params?.id));
    const { name, image, gender, status, type, origin, species, location: lastLocation } = character || {};

    if (isLoading) {
        return (
            <div className={classes.spinner}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classes.detail}>
                <p className={classes.notFound}>Fetch Error 🥺</p>
            </div>
        );
    }
    const statusClass = status === 'Dead' ? classes.dead : status === 'Alive' ? classes.alive : classes.unknown;

    return (
        <div className={classes.detail}>
            <img src={image} alt={`Image ${name}`} />
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
                <Link className={clsx('link', classes.close)} to={'/characters'}>
                    Close
                </Link>
            </div>
        </div>
    );
};

export default CharacterDetail;
