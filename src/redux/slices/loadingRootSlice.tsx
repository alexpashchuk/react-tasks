import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '~redux/store.tsx';

const initialState = {
  isLoading: false,
};

export const loadingRootSlice = createSlice({
  name: 'loadingRoot',
  initialState,
  reducers: {
    setLoadingRoot: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoadingRoot } = loadingRootSlice.actions;
export const selectLoadingRoot = (state: RootState) => state.loadingRoot.isLoading;

export default loadingRootSlice.reducer;
