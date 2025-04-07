import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachers: [],
  isLoading: false,
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setTeachers(state, action) {
      state.teachers = action.payload;
    },
    addTeachers(state, action) {
      state.teachers = [...state.teachers, ...action.payload];
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setTeachers, addTeachers, setLoading } = teachersSlice.actions;
export default teachersSlice.reducer;
