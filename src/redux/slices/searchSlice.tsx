import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { SEARCH_VALUE_STORAGE_KEY } from '@/constants/constants';

const initialState = {
  searchValue: localStorage.getItem(SEARCH_VALUE_STORAGE_KEY) || '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export const selectSearchValue = (state: RootState) => state.search.searchValue;

export default searchSlice.reducer;
