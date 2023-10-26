import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlogServices } from '../services/firebase/blogServices';
import { PostInt } from '../types';

const blogServices = new BlogServices();

export const addPost = createAsyncThunk<void, PostInt>(
  'blog/addPost',
  async (payload, thunkApi) => {
    try {
      await blogServices.addPost(payload);
    } catch (error) {
      return thunkApi.rejectWithValue(`addPost ${error}`);
    }
  }
);
