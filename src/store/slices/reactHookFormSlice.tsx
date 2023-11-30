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

export const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    setReactHookFormData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setReactHookFormData } = reactHookFormSlice.actions;
export const selectReactHookFormData = (state: RootState) => state.reactHookForm.data;

export default reactHookFormSlice.reducer;
