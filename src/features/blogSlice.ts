import { createSlice } from '@reduxjs/toolkit';
import { PostInt } from '../types';
import { addPosts } from './blogAsyncThunk';

interface InitialStateInt {
  userPosts: PostInt[];
  isOpenSideNav: boolean;
  uploading: boolean;
  uploadingFailed: boolean;
  uploadingSucceed: boolean;
  categories: string[];
}

const initialState: InitialStateInt = {
  userPosts: [],
  isOpenSideNav: false,
  uploading: false,
  uploadingFailed: false,
  uploadingSucceed: false,
  categories: [],
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    handleSideNav: (state) => {
      return { ...state, isOpenSideNav: !state.isOpenSideNav };
    },
    resetProp(state, action) {
      const key = action.payload as keyof InitialStateInt;
      return { ...state, [key]: false };
    },
    setPosts(state, action) {
      state.userPosts = action.payload;
    },
    setCateg(state, action) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    // *Add Post
    builder
      .addCase(addPosts.pending, (state) => {
        state.uploading = true;
      })
      .addCase(addPosts.fulfilled, (state) => ({
        ...state,
        uploading: false,
        uploadingSucceed: true,
      }))
      .addCase(addPosts.rejected, (state, error) => {
        return { ...state, uploading: false, uploadingFailed: true };
      });
  },
});

export default blogSlice.reducer;
