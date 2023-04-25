import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserLogged: false,
  isOpenSideNav: false,
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    handeSideNav: (state) => {
      return { ...state, isOpenSideNav: !state.isOpenSideNav };
    },
  },
});

export default blogSlice.reducer;
