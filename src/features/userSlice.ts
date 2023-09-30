import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo, userSignIn, userSignUp } from './userAsyncThunk';
import { UserInfoInt } from '../types';

interface InitialStateInt {
  userInfo: null | UserInfoInt;
  isUserLoggedIn: boolean;
  isSignupLoading: boolean;
  isSignedUp: boolean;
  // userInfoLoading: boolean;
  isJustLoggedIn: boolean;
  isLogInLoading: boolean;
  signInError: string;
}

const initialState: InitialStateInt = {
  userInfo: null,
  isUserLoggedIn: false,
  isSignupLoading: false,
  isSignedUp: false,
  // userInfoLoading: true,
  isJustLoggedIn: false,
  isLogInLoading: false,
  signInError: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsUserLoggedIn(state, action) {
      return { ...state, isUserLoggedIn: action.payload };
    },
    setIsSignedUp(state, action) {
      state.isSignedUp = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload as UserInfoInt;
    },
    resetAuthError(state, action) {
      state.signInError = '';
    },
    resetIsJustLoggedIn(state, action) {
      state.isJustLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    // *Signup User
    builder
      .addCase(userSignUp.pending, (state) => {
        state.isSignupLoading = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isSignupLoading = false;
        state.isSignedUp = true;
      })
      .addCase(userSignUp.rejected, (state, error) => {
        state.isSignupLoading = false;
        console.log(error);
      });
    // *Get Userinfo
    // builder
    //   .addCase(getUserInfo.pending, (state) => {
    //     state.userInfoLoading = true;
    //   })
    //   .addCase(getUserInfo.fulfilled, (state, action) => {
    //     state.isUserLoggedIn = true;
    //     state.userInfoLoading = false;
    //   })
    //   .addCase(getUserInfo.rejected, (state, error) => {
    //     state.userInfoLoading = false;
    //     console.log(error);
    //   });
    // *Sign in
    builder
      .addCase(userSignIn.pending, (state) => {
        state.isLogInLoading = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isLogInLoading = false;
        state.isUserLoggedIn = true;
        state.isJustLoggedIn = true;
      })
      .addCase(userSignIn.rejected, (state, error) => {
        state.isLogInLoading = false;
        state.signInError = error.payload as string;
      });
  },
});

export default userSlice.reducer;
