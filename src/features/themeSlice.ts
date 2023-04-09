import { createSlice } from '@reduxjs/toolkit';

const initialState = 'light';

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state === 'light') state = 'dark';
      else state = 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
