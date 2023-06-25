import React, { useEffect } from 'react';
import './scss/main.scss';
import avi from './assets/Me cropped.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
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
  Posts,
  DisplayUsers,
  ProfileSettings,
  AccountSettings,
} from './pages';
import { useBlogSelector, useBlogDispatch } from './app/store';
import { toggleTab } from './features/tabSlice';
import { FollowsInt } from './types';

const App = () => {
  const theme = useBlogSelector((state) => state.theme);
  const tabStatus = useBlogSelector((state) => state.tab);
  const dispatch = useBlogDispatch();
  const [dummyFollows] = React.useState<FollowsInt[]>([
    { userName: 'Dummy name', id: 'asdf', avi },
    { userName: 'Dummy name', id: 'asdfd', avi },
    { userName: 'Dummy name', id: 'asdfs', avi },
    { userName: 'Dummy name', id: 'asdf8', avi },
    { userName: 'Dummy name', id: 'asdfd4', avi },
    { userName: 'Dummy name', id: 'asdfsl', avi },
  ]);

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
        <Route path='/:username/dashboard' element={<Dashboard />}>
          <Route path='/:username/dashboard/posts' element={<Posts />} />
          <Route
            path='/:username/dashboard/followers'
            element={<DisplayUsers users={dummyFollows} />}
          />
          <Route
            path='/:username/dashboard/followings'
            element={<DisplayUsers users={dummyFollows.slice(0, 3)} />}
          />
        </Route>
        <Route path='/faqs' element={<FAQ />} />
        <Route path='/join' element={<Signup />} />
        <Route path='/enter' element={<Login />} />
        <Route path='/settings' element={<Settings />}>
          <Route path='profile' element={<ProfileSettings />} />
          <Route path='account' element={<AccountSettings />} />
        </Route>
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
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Sidenav />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
};

export default App;
