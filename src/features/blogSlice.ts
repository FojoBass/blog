import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenSideNav: false,
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    handleSideNav: (state) => {
      return { ...state, isOpenSideNav: !state.isOpenSideNav };
    },
  },
});

export default blogSlice.reducer;
