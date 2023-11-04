import { useListCharacters } from '~hooks/useListCharacters.tsx';

import Pagination from '~components/Pagination/Pagination.tsx';

import CardCharacter from '../CardCharacter/CardCharacter.tsx';
import Spinner from '../Spinner/Spinner.tsx';
import classes from './itemList.module.css';

export type ListCharactersProps = {
  onToggle: (t: string | number) => void;
  setSkip: (s: boolean) => void;
  skip: boolean;
};
const ListCharacters = (props: ListCharactersProps) => {
  const { onToggle, setSkip } = props;
  const { isLoading, error, characters, setIsLoadingImage, isLoadingImage, totalPages, currentPage } =
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
          <p className={classes.page}>{`Page ${currentPage} of ${totalPages}`}</p>
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
            <Pagination page={currentPage} totalPages={totalPages} setSkip={setSkip} />
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
