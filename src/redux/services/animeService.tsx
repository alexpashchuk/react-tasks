import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { BASE_URL } from '@/constants/constants';
import { IAnimeData, IAnimeDataDetails, IAnimeListApi } from '@/types/types';
import { setAnimeDetails, setAnimeList } from '@/redux/slices/animeDataSlice';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getAnimeList: build.query<IAnimeData, IAnimeListApi>({
      query: ({ pageQuery, searchQuery, perPageQuery, initialPageSize }) => {
        return {
          url: `?page=${pageQuery}&q=${searchQuery.trim().toLowerCase()}&limit=${
            initialPageSize ? perPageQuery : '20'
          }`,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;

        dispatch(setAnimeList({ animeList: data.data }));
      },
    }),
    getAnimeDetail: build.query<IAnimeDataDetails, string>({
      query: (id) => {
        return {
          url: `${id}`,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;

        dispatch(setAnimeDetails({ animeDetails: data.data }));
      },
    }),
  }),
});

export const {
  useGetAnimeListQuery,
  useGetAnimeDetailQuery,
  util: { getRunningQueriesThunk },
} = animeApi;

export const { getAnimeList, getAnimeDetail } = animeApi.endpoints;
