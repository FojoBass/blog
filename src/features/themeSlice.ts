import { createSlice } from '@reduxjs/toolkit';
import { StorageFuncs } from '../services/storages';

const initialState = 'light';

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return state === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action) {
      return action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
