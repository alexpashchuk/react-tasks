import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice.tsx';
import perPageReducer from './slices/perPageSlice.tsx';
import loadingDetailsReducer from './slices/loadingDetailsSlice.tsx';
import loadingRootReducer from './slices/loadingRootSlice.tsx';
import viewModeReducer from './slices/viewModeSlice.tsx';
import { animeApi } from '~redux/services/animeService.tsx';

const store = configureStore({
  reducer: {
    search: searchReducer,
    perPage: perPageReducer,
    loadingDetails: loadingDetailsReducer,
    loadingRoot: loadingRootReducer,
    viewMode: viewModeReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
