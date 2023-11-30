import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormReducer from './slices/uncontrolledFormSlice.tsx';
import reactHookFormReducer from './slices/reactHookFormSlice.tsx';

const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormReducer,
    reactHookForm: reactHookFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
