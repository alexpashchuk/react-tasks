import { useAnimeList } from '@/hooks/useAnimeList';

import Pagination from '@/components/Pagination/pagination';
import AnimeCard from '@/components/AnimeCard/animeCard';
import PageSize from '@/components/PageSize/pageSize';
import Spinner from '@/components/Spinner/spinner';

import classes from './animeList.module.css';

const AnimeList = () => {
  const { isLoading, isError, data, totalPages, pageQuery } = useAnimeList();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div>
        <p className={classes.notFound}>Failed to fetch 🥺</p>
      </div>
    );
  }

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <div className={classes.pageInfo}>
            <p className={classes.page}>{`Page ${pageQuery} of ${totalPages}`}</p>
            <PageSize />
          </div>
          <div className={classes.wrapper}>
            {data.map((item) => (
              <AnimeCard key={item.mal_id} anime={item} />
            ))}
            <Pagination page={pageQuery} totalPages={totalPages} />
          </div>
        </>
      ) : (
        <div>
          <p className={classes.notFound}>Items Not Found 🙄</p>
        </div>
      )}
    </>
  );
};

export default AnimeList;
