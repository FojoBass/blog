import { createSlice } from '@reduxjs/toolkit';
import { userSignUp } from './userAsyncThunk';

const initialState = {
  userInfo: null,
  isUserLoggedIn: false,
  isSignupLoading: false,
  isSignedUp: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsUserLoggedIn: (state, action) => {
      return { ...state, isUserLoggedIn: action.payload };
    },
    setIsSignedUp: (state, action) => {
      state.isSignedUp = action.payload;
    },
  },
  extraReducers: (builder) => {
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
  },
});

export default userSlice.reducer;
