import { useListCharacters } from '~hooks/useListCharacters.tsx';

import Pagination from '~components/Pagination/Pagination.tsx';

import CardCharacter from '../CardCharacter/CardCharacter.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import classes from './itemList.module.css';
import { SetURLSearchParams } from 'react-router-dom';

type ListCharactersProps = {
    searchTerm: string;
    onToggle: (to: string) => void;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
};

const ListCharacters = (props: ListCharactersProps) => {
    const { onToggle } = props;
    const { isLoading, error, characters, setIsLoadingImage, isLoadingImage, totalPages, page, handlePageChange } =
        useListCharacters(props);

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
                <>
                    <p className={classes.page}>
                        Page {page} of {totalPages}
                    </p>
                    <div data-testid="item" className={classes.wrapper}>
                        {characters.map((character) => (
                            <CardCharacter
                                key={character.id}
                                character={character}
                                setIsLoadingImage={setIsLoadingImage}
                                isLoadingImage={isLoadingImage}
                                onToggle={onToggle}
                            />
                        ))}
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            prevPage={() => handlePageChange(-1)}
                            nextPage={() => handlePageChange(1)}
                        />
                    </div>
                </>
            ) : (
                <div data-testid="item">
                    <p className={classes.notFound}>Characters Not Found 🙄</p>
                </div>
            )}
        </>
    );
};

export default ListCharacters;
