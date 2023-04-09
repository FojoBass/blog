import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    toggleTab: (state) => {
      if (state) return false;
      else return true;
    },
  },
});

export const { toggleTab } = tabSlice.actions;
export default tabSlice.reducer;
