import React, { useEffect } from 'react';
import './scss/main.scss';
import avi from './assets/Me cropped.jpg';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
import { FollowsInt, SearchFollowsInt, UserInfoInt } from './types';
import { userSlice } from './features/userSlice';
import { StorageFuncs } from './services/storages';
import { useGlobalContext } from './context';
import GetUserInfo from './modals/GetUserInfo';
import { auth, db } from './services/firebase/config';
import Verification from './modals/Verification';
import Bookmarks from './pages/dashboard/Bookmarks';
import { BlogServices } from './services/firebase/blogServices';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const App = () => {
  const auth = getAuth();
  const theme = useBlogSelector((state) => state.theme);
  const tabStatus = useBlogSelector((state) => state.tab);
  const { isUserLoggedIn, noUserInfo, userInfo } = useBlogSelector(
    (state) => state.user
  );
  const { userPosts } = useBlogSelector((state) => state.blog);
  const dispatch = useBlogDispatch();

  const { setUserInfo, setIsUserLoggedIn, setNoUserInfo } = userSlice.actions;
  const { storageKeys, loginPersistence, setAuthLoading } = useGlobalContext();

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} errorElement={<Error type='404' />}>
        <Route index element={<Home />} />
        <Route path='/know-us' element={<About />} />
        <Route path='/meet-us' element={<Contact />} />
        <Route path='/:uid/dashboard' element={<Dashboard />}>
          <Route path='posts' element={<Posts />} />
          <Route
            path='followers'
            element={
              <DisplayUsers
                users={
                  userInfo?.followers
                    ? userInfo.followers.map((fol) => ({
                        ...fol,
                        isDummy: false,
                        postId: '',
                        createdAt: '',
                      }))
                    : []
                }
                type='followers'
              />
            }
          />
          <Route
            path='followings'
            element={
              <DisplayUsers
                users={
                  userInfo?.followings
                    ? userInfo.followings.map((fol) => ({
                        ...fol,
                        isDummy: false,
                        postId: '',
                        createdAt: '',
                      }))
                    : []
                }
                type='followings'
              />
            }
          />
          <Route path='bookmarks' element={<Bookmarks />} />
        </Route>
        <Route path='/faqs' element={<FAQ />} />
        <Route path='/join' element={<Signup />} />
        <Route path='/enter' element={<Login />} />
        <Route path='/settings/:id' element={<Settings />}>
          <Route path='profile/' element={<ProfileSettings />} />
          <Route path='account/' element={<AccountSettings />} />
        </Route>
        <Route path='/new-post' element={<NewPost />} />
        <Route path='/notifications' element={<Notification />} />
        <Route path='/:uid/:postId' element={<Post />} />
        <Route path='/p/:uid' element={<Profile />} />
        <Route path='/categories/:category' element={<CategoryPosts />} />
        <Route path='/search' element={<Search />} />
      </Route>
    )
  );

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

  useEffect(() => {
    document.documentElement.classList.add('mouse');
    let unsub: () => void;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.uid);
        // * User log in variable is false, and there is userInfo
        if (isUserLoggedIn && !userInfo) {
          try {
            let userInfo;
            const snapQuery = query(
              collection(db, 'users'),
              where('email', '==', user.email)
            );

            unsub = onSnapshot(snapQuery, (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                userInfo = doc.data() ?? null;

                dispatch(
                  setUserInfo({
                    ...userInfo,
                    createdAt: userInfo.createdAt
                      ? userInfo.createdAt.toDate().toString()
                      : '',
                  })
                );
              });

              if (!querySnapshot.size) {
                dispatch(setNoUserInfo(true));
                dispatch(setIsUserLoggedIn(true));
                unsub();
              }
            });
          } catch (error) {
            console.log('User info fetch failed: ', error);
          }
          // dispatch(setIsUserLoggedIn(true));
        }

        // console.log('signed in: ');
        // console.log('signed in: ', user);
      } else {
        console.log('signed out');
      }
      setAuthLoading && setAuthLoading(false);
    });
    return () => unsub?.();
  }, [storageKeys, loginPersistence]);

  useEffect(() => {
    console.log('user info: ', userInfo);
  }, [userInfo]);

  useEffect(() => {
    document.documentElement.style.overflowY = noUserInfo ? 'hidden' : 'auto';
  }, [noUserInfo]);
  return <RouterProvider router={router} />;
};

const Root = () => {
  const location = useLocation();
  const theme = useBlogSelector((state) => state.theme);
  const { noUserInfo, isUserLoggedIn } = useBlogSelector((state) => state.user);
  const {
    delAcc,
    searchString,
    setSearchString,
    setSearchResults,
    skeletonPosts,
  } = useGlobalContext();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';

    if (!location.pathname.includes('search')) {
      setSearchString && setSearchString((prev) => (prev ? '' : prev));

      skeletonPosts && setSearchResults && setSearchResults([...skeletonPosts]);
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Sidenav />
      {!delAcc && noUserInfo && isUserLoggedIn && <GetUserInfo />}
      {!noUserInfo &&
        !auth.currentUser?.emailVerified &&
        typeof auth.currentUser?.emailVerified === 'boolean' && (
          <Verification />
        )}
      <Outlet />
      <ToastContainer
        theme={theme === 'light' ? 'light' : 'dark'}
        position='top-center'
        closeButton={false}
        transition={Zoom}
        autoClose={3000}
        hideProgressBar={true}
      />
      <Footer />
    </>
  );
};

export default App;
