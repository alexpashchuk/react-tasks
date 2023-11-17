import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '~redux/store.tsx';

const initialState = {
  viewMode: 'root',
};

export const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setViewMode } = viewModeSlice.actions;
export const selectViewMode = (state: RootState) => state.viewMode.viewMode;

export default viewModeSlice.reducer;
