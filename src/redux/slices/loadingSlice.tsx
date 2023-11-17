import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoadingRoot: false,
  isLoadingDetails: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingRoot: (state, action) => {
      state.isLoadingRoot = action.payload;
    },
    setLoadingDetails: (state, action) => {
      state.isLoadingDetails = action.payload;
    },
  },
});

export const { setLoadingRoot, setLoadingDetails } = loadingSlice.actions;

export default loadingSlice.reducer;
