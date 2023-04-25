import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import tabReducer from '../features/tabSlice';
import blogReducer from '../features/blogSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tab: tabReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useBlogDispatch = () => useDispatch<typeof store.dispatch>();
export const useBlogSelector: TypedUseSelectorHook<RootState> = useSelector;
