import { createSlice } from '@reduxjs/toolkit';
import { PostInt } from '../types';
import { addPost } from './blogAsyncThunk';

interface InitialStateInt {
  pubPosts: PostInt[];
  userPosts: PostInt[];
  isOpenSideNav: boolean;
  uploading: boolean;
  uploadingFailed: boolean;
  uploadingSucceed: boolean;
  categories: string[];
}

const initialState: InitialStateInt = {
  pubPosts: [],
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
      switch (action.payload.type) {
        case 'pub':
          state.pubPosts = action.payload.posts;
          break;
        case 'user':
          state.userPosts = action.payload.posts;
          break;
        default:
          return state;
      }
    },
    setCateg(state, action) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    // *Add Post
    builder
      .addCase(addPost.pending, (state) => {
        state.uploading = true;
      })
      .addCase(addPost.fulfilled, (state) => ({
        ...state,
        uploading: false,
        uploadingSucceed: true,
      }))
      .addCase(addPost.rejected, (state, error) => {
        console.log(error);
        return { ...state, uploading: false, uploadingFailed: true };
      });
  },
});

export default blogSlice.reducer;
