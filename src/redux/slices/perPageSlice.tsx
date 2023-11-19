import { createSlice } from '@reduxjs/toolkit';

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
export default perpPageSlice.reducer;
