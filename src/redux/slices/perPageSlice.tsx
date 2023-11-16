import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '~redux/store.tsx';

const initialState = {
  perPage: '20',
};

export const perpPageSlice = createSlice({
  name: 'perPage',
  initialState,
  reducers: {
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
});

export const { setPerPage } = perpPageSlice.actions;
export const selectSearchValue = (state: RootState) => state.perPage.perPage;

export default perpPageSlice.reducer;
