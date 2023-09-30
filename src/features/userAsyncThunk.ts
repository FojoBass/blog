import ShortUniqueId from 'short-unique-id';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlogServices } from '../services/firebase/blogServices';
import { UserCredential } from 'firebase/auth';
import { getDownloadURL } from 'firebase/storage';
import { FormDataInt, UserInfoInt } from '../types';
import {
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '../services/firebase/config';
import { userSlice } from './userSlice';

interface UserSignUpPayloadInt {
  email: string;
  password: string;
  bigAviFile: File;
  smallAviFile: File;
  formData: FormDataInt;
}

const blogServices = new BlogServices();
const uidLong = new ShortUniqueId({ length: 10 });

// * Signup User
export const userSignUp = createAsyncThunk<void, UserSignUpPayloadInt>(
  'user/regUser',
  async (payload, thunkApi) => {
    const uploadImg = (file: File, isBig: boolean): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        const uploadTask = new BlogServices().uplaodAviImg(userId, isBig, file);
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

    const { email, password, formData, bigAviFile, smallAviFile } = payload;
    const userId = uidLong.rnd();
    try {
      await blogServices.emailReg(email, password);
      await blogServices.logOut();
      const bigAviUrl = await uploadImg(bigAviFile, true);
      const smallAviUrl = await uploadImg(smallAviFile, false);
      await blogServices.setUserInfo({
        ...formData,
        email: payload.email,
        aviUrls: { bigAviUrl, smallAviUrl },
        userId,
        createdAt: serverTimestamp(),
      });
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
    thunkApi.dispatch(getUserInfo({ email }));
  } catch (error) {
    return thunkApi.rejectWithValue(`Signin failed: ${error}`);
  }
});

// ?  Github
export const userGitSignIn = createAsyncThunk<void, void>(
  'user/userGitSignIn',
  async (payload, thunkApi) => {
    try {
      console.log('git login try');
      const res = await blogServices.signInGit();
      console.log('git login: ', res);

      //  thunkApi.dispatch(getUserInfo({ email }));
    } catch (error) {
      return thunkApi.rejectWithValue(`Signin failed: ${error}`);
    }
  }
);

// * Get User info
export const getUserInfo = createAsyncThunk<void, { email: string }>(
  'user/getUserInfo',
  async (payload, thunkApi) => {
    const { email } = payload;
    let userInfo;

    const { setUserInfo } = userSlice.actions;

    try {
      const snapQuery = query(
        collection(db, 'users'),
        where('email', '==', email)
      );

      onSnapshot(snapQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userInfo = doc.data();
          thunkApi.dispatch(
            setUserInfo({
              ...userInfo,
              createdAt: userInfo.createdAt
                ? userInfo.createdAt.toDate().toString()
                : '',
            })
          );
        });
      });
    } catch (error) {
      return thunkApi.rejectWithValue(`Get user info ${error}`);
    }
  }
);
