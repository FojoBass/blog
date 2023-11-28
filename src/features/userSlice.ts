import { createSlice } from '@reduxjs/toolkit';
import {
  addFollow,
  forgotPword,
  userGitSignIn,
  userGooSignIn,
  userSignIn,
  userSignUp,
} from './userAsyncThunk';
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
  noUserInfo: boolean;
  isSuccessLogin: boolean;
  followLoading: boolean;
  followError: any;
}

const initialState: InitialStateInt = {
  userInfo: null,
  isUserLoggedIn: false,
  isSignupLoading: false,
  isSignedUp: false,
  followLoading: false,
  isJustLoggedIn: false,
  isLogInLoading: false,
  signInError: '',
  noUserInfo: false,
  isSuccessLogin: false,
  followError: '',
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
    setAuthError(state, action) {
      state.signInError = action.payload;
    },
    setIsJustLoggedIn(state, action) {
      state.isJustLoggedIn = action.payload;
    },
    setNoUserInfo(state, action) {
      state.noUserInfo = action.payload;
    },
    resetIsSuccessLogin(state) {
      state.isSuccessLogin = false;
    },
    resetIsLogInLoading(state) {
      state.isLogInLoading = false;
    },
    resetFollowError(state) {
      state.followError = '';
    },
  },
  extraReducers: (builder) => {
    // *Signup User
    builder
      .addCase(userSignUp.pending, (state) => {
        state.isSignupLoading = true;
      })
      .addCase(userSignUp.fulfilled, (state) => {
        state.isSignupLoading = false;
        state.isSignedUp = true;
      })
      .addCase(userSignUp.rejected, (state, error) => {
        state.isSignupLoading = false;
        state.signInError = error.payload as string;
        console.log(error);
      });
    // *Forgot Password
    builder
      .addCase(forgotPword.pending, (state) => {
        state.isLogInLoading = true;
      })
      .addCase(forgotPword.fulfilled, (state) => {
        state.isLogInLoading = false;
        state.isJustLoggedIn = true;
      })
      .addCase(forgotPword.rejected, (state, error) => {
        state.isLogInLoading = false;
        state.signInError = error.payload as string;
      });

    // *Follows
    builder
      .addCase(addFollow.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(addFollow.fulfilled, (state) => {
        state.followLoading = false;
      })
      .addCase(addFollow.rejected, (state, error) => {
        state.followLoading = false;
        state.followError = error.payload as any;
      });

    // *Sign in
    // ?Email
    builder
      .addCase(userSignIn.pending, (state) => {
        state.isLogInLoading = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isSuccessLogin = true;
      })
      .addCase(userSignIn.rejected, (state, error) => {
        state.isLogInLoading = false;
        state.signInError = error.payload as string;
      });

    // ?Git
    builder
      .addCase(userGitSignIn.pending, (state) => {
        state.isLogInLoading = true;
      })
      .addCase(userGitSignIn.fulfilled, (state, action) => {
        state.isSuccessLogin = true;
      })
      .addCase(userGitSignIn.rejected, (state, error) => {
        state.isLogInLoading = false;
        state.signInError = error.payload as string;
      });

    // ?Gooogle
    builder
      .addCase(userGooSignIn.pending, (state) => {
        state.isLogInLoading = true;
      })
      .addCase(userGooSignIn.fulfilled, (state, action) => {
        state.isSuccessLogin = true;
      })
      .addCase(userGooSignIn.rejected, (state, error) => {
        state.isLogInLoading = false;
        state.signInError = error.payload as string;
      });
  },
});

export default userSlice.reducer;
