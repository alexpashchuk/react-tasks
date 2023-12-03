import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store.tsx';
import { FormDataSlice } from '@/types/types.ts';

const initialState: FormDataSlice<string> = {
  data: [],
};

export const formDataSlice = createSlice({
  name: 'formDataSlice',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setFormData } = formDataSlice.actions;
export const selectFormData = (state: RootState) => state.form.data;

export default formDataSlice.reducer;
