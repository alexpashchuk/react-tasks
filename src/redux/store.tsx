import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import perPageReducer from './slices/perPageSlice';
import loadingReducer from './slices/loadingSlice';
import viewModeReducer from './slices/viewModeSlice';
import { animeApi } from '@/redux/services/animeService';

const store = configureStore({
  reducer: {
    search: searchReducer,
    perPage: perPageReducer,
    loading: loadingReducer,
    viewMode: viewModeReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
