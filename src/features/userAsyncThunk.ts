import ShortUniqueId from 'short-unique-id';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlogServices } from '../services/firebase/blogServices';
import { UserCredential } from 'firebase/auth';
import { getDownloadURL } from 'firebase/storage';
import { FollowsInt, FormDataInt, UserInfoInt } from '../types';
import {
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { auth, db } from '../services/firebase/config';
import { userSlice } from './userSlice';
import { followsHandler } from '../helpers/followsHandler';
import { RootState } from '../app/store';

interface UserSignUpPayloadInt {
  email: string;
  password: string;
  bigAviFile: File;
  smallAviFile: File;
  formData: FormDataInt;
}

interface FollowPayInt {
  isFollow: boolean;
  posterName: string;
  uid: string;
  avi: string;
}

const blogServices = new BlogServices();
const uidLong = new ShortUniqueId({ length: 10 });

// * Signup User
export const userSignUp = createAsyncThunk<void, UserSignUpPayloadInt>(
  'user/regUser',
  async (payload, thunkApi) => {
    const uploadImg = (file: File, isBig: boolean): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        const uploadTask = new BlogServices().uplaodAviImg(
          uid ? uid : auth.currentUser!.uid,
          isBig,
          file
        );
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              if (downloadURL) resolve(downloadURL);
              else reject('Avi upload failed');
            });
          }
        );
      });
    };

    const { setNoUserInfo } = userSlice.actions;

    const { email, password, formData, bigAviFile, smallAviFile } = payload;
    const userId = uidLong.rnd();
    let uid = '';
    try {
      if (password) {
        await blogServices.emailReg(email, password);
        uid = auth.currentUser?.uid ?? '';
        await blogServices.logOut();
      }
      const bigAviUrl = await uploadImg(bigAviFile, true);
      const smallAviUrl = await uploadImg(smallAviFile, false);
      await blogServices.setUserInfo({
        ...formData,
        email: payload.email,
        aviUrls: { bigAviUrl, smallAviUrl },
        userId,
        uid: uid ? uid : auth.currentUser!.uid,
        createdAt: serverTimestamp(),
        followers: [],
        followings: [],
        userColor: '#000000',
        postCount: 0,
        dispEmail: true,
        bookmarks: [],
      });
      if (!password) thunkApi.dispatch(setNoUserInfo(false));
    } catch (error) {
      return thunkApi.rejectWithValue(`Signup failed: ${error}`);
    }
  }
);

// * Signin User
// ? Email
export const userSignIn = createAsyncThunk<
  void,
  { email: string; password: string }
>('user/signinUser', async (payload, thunkApi) => {
  const { email, password } = payload;
  try {
    await blogServices.signIn(email, password);
    // thunkApi.dispatch(getUserInfo({ email }));
  } catch (error) {
    return thunkApi.rejectWithValue(`Signin failed: ${error}`);
  }
});

// ?  Github
export const userGitSignIn = createAsyncThunk<void, void>(
  'user/userGitSignIn',
  async (payload, thunkApi) => {
    try {
      console.log('Start git auth');
      const res = await blogServices.signInGit();
      console.log('End git auth');
      // thunkApi.dispatch(getUserInfo({ email: res.user.email ?? '' }));
    } catch (error) {
      return thunkApi.rejectWithValue(`Signin failed: ${error}`);
    }
  }
);

// ?  Google
export const userGooSignIn = createAsyncThunk<void, void>(
  'user/userGooSignIn',
  async (payload, thunkApi) => {
    try {
      const res = await blogServices.signInGoo();
      // thunkApi.dispatch(getUserInfo({ email: res.user.email ?? '' }));
    } catch (error) {
      return thunkApi.rejectWithValue(`Signin failed: ${error}`);
    }
  }
);

export const addFollow = createAsyncThunk<void, FollowPayInt>(
  'blog/addFollow',
  async (payload, thunkApi) => {
    const { isFollow, posterName, uid, avi } = payload;
    const userInfo = (thunkApi.getState() as RootState).user.userInfo;
    try {
      const info = await blogServices.getUserInfo(uid);
      let followers = info.data()!.followers as FollowsInt[];

      await followsHandler(userInfo!, followers, isFollow, {
        posterName,
        uid,
        avi,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// *Forgot Password
export const forgotPword = createAsyncThunk<void, { email: string }>(
  'user/forgotPword',
  async ({ email }, thunkApi) => {
    try {
      await blogServices.forgotPword(email);
    } catch (error) {
      return thunkApi.rejectWithValue(`Forgot password ${error}`);
    }
  }
);
