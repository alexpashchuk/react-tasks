import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '~constants/constants.ts';
import { IAnimeData, IAnimeDataDetails } from '~types/types.ts';

type IAnimeListApi = {
  pageQuery: number;
  searchQuery: string;
  perPageQuery: string;
  initialPageSize: boolean;
};

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (build) => ({
    getAnimeList: build.query<IAnimeData, IAnimeListApi>({
      query: ({ pageQuery, searchQuery, perPageQuery, initialPageSize }) => {
        return {
          url: `/anime?page=${pageQuery}&q=${searchQuery.trim().toLowerCase()}&limit=${
            initialPageSize ? perPageQuery : '20'
          }`,
        };
      },
    }),
    getAnimeDetail: build.query<IAnimeDataDetails, string>({
      query: (id) => {
        return {
          url: `/anime/${id}`,
        };
      },
    }),
  }),
});

export const { useGetAnimeListQuery, useGetAnimeDetailQuery } = animeApi;