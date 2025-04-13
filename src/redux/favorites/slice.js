import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(id => id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFavorites(state, action) {
      state.favorites = action.payload || [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
