import CardCharacter from '../CardCharacter/CardCharacter.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import classes from './itemList.module.css';
import { useListCharacters } from '~hooks/useListCharacters.tsx';

type ListCharactersProps = {
    searchTerm: string;
    page: number;
};

const ListCharacters = (props: ListCharactersProps) => {
    const { isLoading, error, characters } = useListCharacters(props);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div>
                <p className={classes.notFound}>Fetch Error 🥺</p>
            </div>
        );
    }

    return (
        <>
            {characters && characters.length > 0 ? (
                <div data-testid="item" className={classes.wrapper}>
                    {characters.map((character) => (
                        <CardCharacter key={character.id} character={character} />
                    ))}
                </div>
            ) : (
                <div data-testid="item">
                    <p className={classes.notFound}>Characters Not Found 🙄</p>
                </div>
            )}
        </>
    );
};

export default ListCharacters;
