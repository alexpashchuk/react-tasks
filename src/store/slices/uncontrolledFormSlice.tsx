import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store.tsx';
import { FormData } from '@/types/types.ts';

const initialState: FormData = {
  data: {
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
    gender: '',
    country: '',
    tc: false,
  },
};

export const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUncontrolledFormData } = uncontrolledFormSlice.actions;
export const selectUncontrolledFormData = (state: RootState) => state.uncontrolledForm.data;

export default uncontrolledFormSlice.reducer;
