import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlogServices } from '../services/firebase/blogServices';
import { UserCredential } from 'firebase/auth';
import { v4 } from 'uuid';
import { getDownloadURL } from 'firebase/storage';
import { FormDataInt } from '../pages/Signup';

interface UserSignUpPayloadInt {
  email: string;
  password: string;
  bigAviFile: File;
  smallAviFile: File;
  formData: FormDataInt;
}

const blogServices = new BlogServices();

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
    const userId = v4();
    try {
      await blogServices.emailReg(email, password);
      await blogServices.logOut();
      const bigAviUrl = await uploadImg(bigAviFile, true);
      const smallAviUrl = await uploadImg(smallAviFile, false);
      await blogServices.setUserInfo({
        ...formData,
        aviUrls: { bigAviUrl, smallAviUrl },
        userId,
      });
    } catch (error) {
      return thunkApi.rejectWithValue(`Signup failed: ${error}`);
    }
  }
);

export const userSignIn = createAsyncThunk<
  UserCredential,
  { email: string; password: string }
>('user/signinUser', async (payload, thunkApi) => {
  const { email, password } = payload;
  try {
    return await blogServices.signIn(email, password);
  } catch (error) {
    return thunkApi.rejectWithValue(`Signin failed: ${error}`);
  }
});
