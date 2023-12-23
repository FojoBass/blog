import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlogServices } from '../services/firebase/blogServices';
import { PostInt, UpdatePostInt } from '../types';
import { RootState } from '../app/store';

const blogServices = new BlogServices();

export const addPosts = createAsyncThunk<
  void,
  { data: PostInt; type: 'pub' | 'save' }
>('blog/addPubPosts', async (payload, thunkApi) => {
  try {
    const userInfo = (thunkApi.getState() as RootState).user.userInfo;

    // console.log('post data: ', payload.data);

    if (payload.type === 'pub') {
      await blogServices.addPubPosts(payload.data);
      await blogServices.addUserPosts(payload.data);
      await blogServices.updateUserInfo({
        postCount: userInfo?.postCount ? userInfo.postCount + 1 : 1,
      });
    } else {
      await blogServices.addUserPosts(payload.data);
    }
  } catch (error) {
    return thunkApi.rejectWithValue(`addPubPosts ${error}`);
  }
});
