import { configureStore } from '@reduxjs/toolkit';

import formDataReducer from './slices/formDataSlice.tsx';

const store = configureStore({
  reducer: {
    form: formDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
