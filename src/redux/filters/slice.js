import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: '',
  level: '',
  priceRange: [0, 100],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setLevel(state, action) {
      state.level = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
  },
});

export const { setLanguage, setLevel, setPriceRange } = filtersSlice.actions;
export default filtersSlice.reducer;
