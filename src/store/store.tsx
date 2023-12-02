import { configureStore } from '@reduxjs/toolkit';

import formDataReducer from './slices/formDataSlice.tsx';
import countriesDataReducer from './slices/countriesDataSlice.tsx';

const store = configureStore({
  reducer: {
    form: formDataReducer,
    countries: countriesDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
