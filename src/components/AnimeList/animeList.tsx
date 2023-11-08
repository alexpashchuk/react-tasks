import { useAnimeList } from '~hooks/useAnimeList.tsx';

import Pagination from '~components/Pagination/pagination.tsx';

import AnimeCard from '~components/AnimeCard/animeCard.tsx';
import Spinner from '../Spinner/spinner.tsx';
import classes from './animeList.module.css';
import PageSize from '~components/PageSize/pageSize.tsx';

export type ListCharactersProps = {
  onToggle: (t: string | number) => void;
  setSkip: (s: boolean) => void;
  skip: boolean;
};
const AnimeList = (props: ListCharactersProps) => {
  const { onToggle, setSkip } = props;
  const { isLoading, error, data, setIsLoadingImage, isLoadingImage, totalPages, currentPage } = useAnimeList(props);

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
      {data && data.length > 0 ? (
        <>
          <div className={classes.pageInfo}>
            <p className={classes.page}>{`Page ${currentPage} of ${totalPages}`}</p>
            <PageSize setSkip={setSkip} />
          </div>
          <div data-testid="item" className={classes.wrapper}>
            {data.map((item) => (
              <AnimeCard
                key={item.mal_id}
                anime={item}
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
          <p className={classes.notFound}>Items Not Found 🙄</p>
        </div>
      )}
    </>
  );
};

export default AnimeList;
