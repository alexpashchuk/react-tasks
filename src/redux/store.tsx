import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice.tsx';
import perPageReducer from './slices/perPageSlice.tsx';
import loadingReducer from './slices/loadingSlice.tsx';
import viewModeReducer from './slices/viewModeSlice.tsx';
import { animeApi } from '~redux/services/animeService.tsx';

// const rootReducer = combineReducers({
//   search: searchReducer,
//   perPage: perPageReducer,
//   loading: loadingReducer,
//   viewMode: viewModeReducer,
//   [animeApi.reducerPath]: animeApi.reducer,
// });
//
// export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
//   });
// };

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
//
// export default setupStore;

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
