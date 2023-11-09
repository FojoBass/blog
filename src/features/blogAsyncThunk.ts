import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlogServices } from '../services/firebase/blogServices';
import { PostInt } from '../types';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../services/firebase/config';

const blogServices = new BlogServices();

export const addPosts = createAsyncThunk<
  void,
  { data: PostInt; type: 'pub' | 'save' }
>('blog/addPubPosts', async (payload, thunkApi) => {
  try {
    if (payload.type === 'pub') {
      await blogServices.addPubPosts(payload.data);
      await blogServices.addUserPosts(payload.data);
    } else {
      await blogServices.addUserPosts(payload.data);
    }
  } catch (error) {
    return thunkApi.rejectWithValue(`addPubPosts ${error}`);
  }
});
