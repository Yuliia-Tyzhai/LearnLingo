import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import teachersReducer from './features/teachers/slice';
import filtersReducer from './features/filters/slice';
import favoritesReducer from './features/favorites/slice';

const persistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favorites'],
};

const persistedFavoritesReducer = persistReducer(
  persistConfig,
  favoritesReducer
);

export const store = configureStore({
  reducer: {
    teachers: teachersReducer,
    filters: filtersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
