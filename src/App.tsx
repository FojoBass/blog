import React, { useEffect } from 'react';
import './scss/main.scss';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  Home,
  About,
  Contact,
  Dashboard,
  FAQ,
  Signup,
  Login,
  Settings,
  NewPost,
  Notification,
  Post,
  Profile,
  Search,
  Error,
  Navbar,
  Footer,
  Sidenav,
  CategoryPosts,
} from './pages';
import { useBlogSelector, useBlogDispatch } from './app/store';
import { toggleTab } from './features/tabSlice';

const App = () => {
  const theme = useBlogSelector((state) => state.theme);
  const tabStatus = useBlogSelector((state) => state.tab);
  const dispatch = useBlogDispatch();

  const handleTabAdd = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && !tabStatus) {
      dispatch(toggleTab());
    }
  };

  const handleTabRemove = (e: MouseEvent) => {
    if (tabStatus) {
      dispatch(toggleTab());
    }
  };

  useEffect(() => {
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add(theme);
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.replace(
      tabStatus ? 'mouse' : 'tab',
      tabStatus ? 'tab' : 'mouse'
    );

    document.documentElement.onkeydown = handleTabAdd;
    document.documentElement.onmousemove = handleTabRemove;

    return () => {
      document.documentElement.removeEventListener('keydown', handleTabAdd);
      document.documentElement.removeEventListener(
        'mousemove',
        handleTabRemove
      );
    };
  }, [tabStatus]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path='/know-us' element={<About />} />
        <Route path='/meet-us' element={<Contact />} />
        <Route path='/:username/dashboard' element={<Dashboard />} />
        <Route path='/faqs' element={<FAQ />} />
        <Route path='/join' element={<Signup />} />
        <Route path='/enter' element={<Login />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/new-post' element={<NewPost />} />
        <Route path='/notifications' element={<Notification />} />
        <Route path='/:username/:postId' element={<Post />} />
        <Route path='/p/:username' element={<Profile />} />
        <Route path='/categories/:category' element={<CategoryPosts />} />
        <Route path='/search' element={<Search />} />
      </Route>
    )
  );

  useEffect(() => {
    document.documentElement.classList.add('mouse');
  }, []);
  return <RouterProvider router={router} />;
};

const Root = () => {
  return (
    <>
      <Navbar />
      <Sidenav />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
