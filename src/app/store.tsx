import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import tabReducer from '../features/tabSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tab: tabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useBlogDispatch = () => useDispatch<typeof store.dispatch>();
export const useBlogSelector: TypedUseSelectorHook<RootState> = useSelector;
