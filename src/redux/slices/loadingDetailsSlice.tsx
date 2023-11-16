import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '~redux/store.tsx';

const initialState = {
  isLoading: false,
};

export const loadingDetailsSlice = createSlice({
  name: 'loadingDetails',
  initialState,
  reducers: {
    setLoadingDetails: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoadingDetails } = loadingDetailsSlice.actions;
export const selectLoadingDetails = (state: RootState) => state.loadingDetails.isLoading;

export default loadingDetailsSlice.reducer;
