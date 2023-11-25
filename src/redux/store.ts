import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { animeApi } from '@/redux/services/animeService';
import animeDataReducer from './slices/animeDataSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      animeDataReducer,
      [animeApi.reducerPath]: animeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
