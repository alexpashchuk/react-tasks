import { useAnimeList } from '~hooks/useAnimeList.tsx';

import Pagination from '~components/Pagination/pagination.tsx';

import AnimeCard from '~components/AnimeCard/animeCard.tsx';
import Spinner from '../Spinner/spinner.tsx';
import classes from './itemList.module.css';

export type ListCharactersProps = {
  onToggle: (t: string | number) => void;
  setSkip: (s: boolean) => void;
  skip: boolean;
};
const ListCharacters = (props: ListCharactersProps) => {
  const { onToggle, setSkip } = props;
  const { isLoading, error, characters, setIsLoadingImage, isLoadingImage, totalPages, currentPage } =
    useAnimeList(props);

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
              <AnimeCard
                key={character.mal_id}
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
