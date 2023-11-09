import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import tabReducer from '../features/tabSlice';
import blogReducer from '../features/blogSlice';
import userReducer from '../features/userSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tab: tabReducer,
    blog: blogReducer,
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // Disable the serializableCheck middleware
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useBlogDispatch = () => useDispatch<typeof store.dispatch>();
export const useBlogSelector: TypedUseSelectorHook<RootState> = useSelector;
