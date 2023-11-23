import { useEffect } from 'react';
import { useRouter } from 'next/router';

import AnimeDetail from '@/components/AnimeDetail/animeDetail';
import Pagination from '@/components/Pagination/pagination';
import AnimeCard from '@/components/AnimeCard/animeCard';
import PageSize from '@/components/PageSize/pageSize';
import { IData } from '@/types/types';

import classes from './animeList.module.css';

const AnimeList = ({ data }: { data: IData }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const page = query.page || '1';
  const id = query.details;

  useEffect(() => {
    if (!Object.keys(query).length) {
      router.push(`?page=1&perPage=20`);
    }
  }, [query, router]);

  const detailsClass = id ? classes.details_open : classes.details_close;
  const maskClass = id ? classes.mask_open : classes.mask_close;

  const handleCloseDetails = () => {
    delete query.details;
    router.push({ pathname, query: { ...query } }, undefined, { scroll: false });
  };

  return (
    <>
      {data.animeList && data.animeList.data.length > 0 ? (
        <>
          <div className={classes.pageInfo}>
            <p className={classes.page}>{`Page ${page} of ${data.animeList.pagination.last_visible_page}`}</p>
            <PageSize />
          </div>
          <div className={classes.wrapper}>
            {data.animeList.data.map((item) => (
              <AnimeCard key={item.mal_id} anime={item} />
            ))}
            <Pagination page={Number(page)} totalPages={data.animeList.pagination.last_visible_page} />
          </div>
        </>
      ) : (
        <div>
          <p className={classes.notFound}>Items Not Found 🙄</p>
        </div>
      )}
      <div className={detailsClass}>
        {id && data.animeDetails ? (
          <AnimeDetail data={data.animeDetails.data} closeDetails={handleCloseDetails} />
        ) : null}
      </div>
      <div className={maskClass} onClick={handleCloseDetails}></div>
    </>
  );
};

export default AnimeList;
