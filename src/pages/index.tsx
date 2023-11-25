import { GetServerSideProps } from 'next';

import { wrapper } from '@/redux/store';
import { getAnimeDetail, getAnimeList, getRunningQueriesThunk } from '@/redux/services/animeService';
import { IData } from '@/types/types';
import Layout from '@/components/Layout/layout';
import AnimeList from '@/components/AnimeList/animeList';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { page, search, details, perPage } = context.query;

  store.dispatch(
    getAnimeList.initiate({
      pageQuery: page?.toString() || '1',
      searchQuery: search?.toString() || '',
      perPageQuery: perPage?.toString() || '20',
    })
  );

  if (details) {
    store.dispatch(getAnimeDetail.initiate(details.toString()));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      animeList: store.getState().animeDataReducer.animeList,
      animeDetails: store.getState().animeDataReducer.animeDetails,
    },
  };
});

const AnimeRoot = (data: IData) => {
  return (
    <Layout>
      <AnimeList data={data} />
    </Layout>
  );
};

export default AnimeRoot;
