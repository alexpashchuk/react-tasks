import { createSlice } from '@reduxjs/toolkit';
import { IData } from '@/types/types';

const initialState: IData = {
  animeList: { data: [], pagination: { last_visible_page: 1 } },
  animeDetails: {
    data: {
      mal_id: 1,
      rank: 1,
      year: 1,
      score: 1,
      title: '',
      source: '',
      season: '',
      rating: '',
      duration: '',
      airing: false,
      images: {
        webp: { large_image_url: '' },
      },
      episodes: 1,
      status: '',
    },
  },
};

export const animeDataSlice = createSlice({
  name: 'animeData',
  initialState,
  reducers: {
    setAnimeList: (state, action) => {
      state.animeList = action.payload.animeList;
    },
    setAnimeDetails: (state, action) => {
      state.animeDetails = action.payload.animeDetails;
    },
  },
});

export const { setAnimeList, setAnimeDetails } = animeDataSlice.actions;
export default animeDataSlice.reducer;
