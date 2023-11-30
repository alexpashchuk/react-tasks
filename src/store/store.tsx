import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormReducer from './slices/uncontrolledFormSlice.tsx';

const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
