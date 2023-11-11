import {
  Dispatch,
  useContext,
  useState,
  createContext,
  useEffect,
  useRef,
} from 'react';
import { CountryInt, DummyPostsInt, PostInt, UserInfoInt } from './types';
import { useBlogDispatch, useBlogSelector } from './app/store';
import { StorageFuncs } from './services/storages';
import { auth, db } from './services/firebase/config';
import {
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { userSlice } from './features/userSlice';
import { themeSlice } from './features/themeSlice';
import { BlogServices } from './services/firebase/blogServices';
import { blogSlice } from './features/blogSlice';
import {
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { CategoryPosts } from './pages';
import ShortUniqueId from 'short-unique-id';
// import { getPosts } from './features/blogAsyncThunk';

interface ContextInt {
  searchString?: string;
  setSearchString?: Dispatch<React.SetStateAction<string>>;
  isSearch?: boolean;
  setIsSearch?: Dispatch<React.SetStateAction<boolean>>;
  setLoginPersistence?: Dispatch<React.SetStateAction<boolean>>;
  loginPersistence?: boolean;
  setIsVerifyOpen?: Dispatch<React.SetStateAction<boolean>>;
  isVerifyOpen?: boolean;
  filters?: string;
  setFilters?: Dispatch<React.SetStateAction<string>>;
  orderBy?: string;
  setOrderBy?: Dispatch<React.SetStateAction<string>>;
  gender?: string;
  setGender?: Dispatch<React.SetStateAction<string>>;
  state?: string;
  setState?: Dispatch<React.SetStateAction<string>>;
  currYear?: string;
  setCurrYear?: Dispatch<React.SetStateAction<string>>;
  country?: CountryInt;
  setCountry?: Dispatch<React.SetStateAction<CountryInt>>;
  aviBigFile?: File | null;
  setAviBigFile?: Dispatch<React.SetStateAction<File | null>>;
  aviSmallFile?: File | null;
  setAviSmallFile?: Dispatch<React.SetStateAction<File | null>>;
  storageKeys?: {
    currUser: string;
    logPers: string;
    isUserInfo: string;
    userInfoData: string;
    theme: string;
  };
  logOut?: () => void;
  setDelAcc?: Dispatch<React.SetStateAction<boolean>>;
  delAcc?: boolean;
  skeletonPosts?: DummyPostsInt[];
  homePosts?: DummyPostsInt[] | PostInt[];
  setHomePosts?: Dispatch<React.SetStateAction<DummyPostsInt[] | PostInt[]>>;
  userPosts?: DummyPostsInt[] | PostInt[];
  setUserPosts?: Dispatch<React.SetStateAction<DummyPostsInt[] | PostInt[]>>;
  homeLoading?: boolean;
  setHomeLoading?: Dispatch<React.SetStateAction<boolean>>;
  setHomeLastDocTime?: Dispatch<React.SetStateAction<Timestamp | null>>;
  userLastDocTime?: Timestamp | null;
  userPostsLoading?: boolean;
  setUserPostsLoading?: Dispatch<React.SetStateAction<boolean>>;
  setUserLastDocTime?: Dispatch<React.SetStateAction<Timestamp | null>>;
  homeLastDocTime?: Timestamp | null;
  fetchMoreHomePosts?: () => Promise<void>;
  fetchMoreUserPosts?: () => Promise<void>;
  targetUserId?: string;
  setTargetUserId?: Dispatch<React.SetStateAction<string>>;
  authLoading?: boolean;
  setAuthLoading?: Dispatch<React.SetStateAction<boolean>>;
}

const BlogContext = createContext<ContextInt>({});

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userInfo, noUserInfo, isUserLoggedIn, isSuccessLogin } =
    useBlogSelector((state) => state.user);
  const [homeLastDocTime, setHomeLastDocTime] = useState<Timestamp | null>(
    null
  );
  const [userLastDocTime, setUserLastDocTime] = useState<Timestamp | null>(
    null
  );

  const { categories } = useBlogSelector((state) => state.blog);
  const { setCateg } = blogSlice.actions;
  const randId = new ShortUniqueId({ length: 10 });
  const [targetUserId, setTargetUserId] = useState('');

  const [searchString, setSearchString] = useState(''),
    [isSearch, setIsSearch] = useState(false),
    [filters, setFilters] = useState('posts'),
    [orderBy, setOrderBy] = useState('newest');
  const [gender, setGender] = useState('male');
  const [country, setCountry] = useState<{ name: string; code: string }>({
      name: '',
      code: '',
    }),
    [state, setState] = useState<string>('');
  const [aviBigFile, setAviBigFile] = useState<File | null>(null),
    [aviSmallFile, setAviSmallFile] = useState<File | null>(null);
  const [isVerifyOpen, setIsVerifyOpen] = useState(true);
  const [homeLoading, setHomeLoading] = useState(true);
  const [userPostsLoading, setUserPostsLoading] = useState(true);
  const delayListener = useRef(true);
  const isInitial = useRef(true);

  const [storageKeys] = useState({
    currUser: 'devie_current_user',
    logPers: 'devie_login_persistence',
    isUserInfo: 'isUserInfo',
    userInfoData: 'user_info_data',
    theme: 'devie_theme',
  });

  const [delAcc, setDelAcc] = useState(false);
  const [currYear, setCurrYear] = useState('');
  const [skeletonPosts] = useState<DummyPostsInt[]>([
    { isDummy: true, postId: randId.rnd() },
    { isDummy: true, postId: randId.rnd() },
    { isDummy: true, postId: randId.rnd() },
    { isDummy: true, postId: randId.rnd() },
    { isDummy: true, postId: randId.rnd() },
  ]);
  const [homePosts, setHomePosts] = useState<DummyPostsInt[] | PostInt[]>([
    ...skeletonPosts,
  ]);
  const [userPosts, setUserPosts] = useState<DummyPostsInt[] | PostInt[]>([
    ...skeletonPosts,
  ]);

  const [loginPersistence, setLoginPersistence] = useState(
    StorageFuncs.getStorage<boolean>('local', storageKeys.logPers) ?? false
  );

  const dispatch = useBlogDispatch();

  const {
    setNoUserInfo,
    setIsUserLoggedIn,
    resetIsSuccessLogin,
    setIsJustLoggedIn,
    resetIsLogInLoading,
    setAuthError,
    setUserInfo,
  } = userSlice.actions;
  const { setTheme } = themeSlice.actions;

  const blogServices = new BlogServices();
  const [authLoading, setAuthLoading] = useState(true);

  const logOut = async () => {
    await blogServices.logOut();
    dispatch(setIsUserLoggedIn(false));
    isInitial.current = true;

    if (storageKeys) {
      !loginPersistence &&
        StorageFuncs.clearStorage('session', storageKeys.currUser);

      StorageFuncs.clearStorage(
        loginPersistence ? 'local' : 'session',
        storageKeys.isUserInfo
      );

      StorageFuncs.clearStorage(
        loginPersistence ? 'local' : 'session',
        storageKeys.userInfoData
      );
    }
  };

  const fetchMoreHomePosts = async () => {
    try {
      setHomeLoading(true);
      const res = await blogServices.getPosts(true, homeLastDocTime);
      let posts: any[] = [];

      res.forEach((doc) => {
        const post = doc.data();
        posts.push({
          ...post,
          publishedAt: post.publishedAt
            ? post.publishedAt.toDate().toString()
            : '',
        });
      });

      const lastDocTime = res.docs[res.docs.length - 1]
        ? res.docs[res.docs.length - 1].data().publishedAt
        : null;
      lastDocTime && setHomeLastDocTime(lastDocTime as Timestamp);

      setHomePosts((prev) => [
        ...prev.filter((p) => !p.isDummy),
        ...(posts as PostInt[]),
      ]);
    } catch (err) {
      console.log('Home Post More fetch failed: ', err);
      setHomePosts((prev) => [...prev.filter((p) => !p.isDummy)]);
    } finally {
      setHomeLoading(false);
    }
  };

  const fetchMoreUserPosts = async () => {
    try {
      setUserPostsLoading(true);
      const res = await blogServices.getUserPosts(
        true,
        userLastDocTime,
        targetUserId,
        true
      );
      let posts: any[] = [];

      res.forEach((doc) => {
        const post = doc.data();
        posts.push({
          ...post,
          publishedAt: post.publishedAt
            ? post.publishedAt.toDate().toString()
            : '',
          createdAt: post.createdAt ? post.createdAt.toDate().toString() : '',
        });
      });

      const lastDocTime = res.docs[res.docs.length - 1]
        ? res.docs[res.docs.length - 1].data().publishedAt
        : null;
      lastDocTime && setUserLastDocTime(lastDocTime as Timestamp);

      setUserPosts((prev) => [
        ...prev.filter((p) => !p.isDummy),
        ...(posts as PostInt[]),
      ]);
    } catch (err) {
      console.log('User Post More fetch failed: ', err);
      setUserPosts((prev) => [...prev.filter((p) => !p.isDummy)]);
    } finally {
      setUserPostsLoading(false);
    }
  };

  const sharedProps: ContextInt = {
    searchString,
    setSearchString,
    isSearch,
    setIsSearch,
    filters,
    setFilters,
    orderBy,
    setOrderBy,
    gender,
    setGender,
    country,
    setCountry,
    state,
    setState,
    aviBigFile,
    setAviBigFile,
    aviSmallFile,
    setAviSmallFile,
    storageKeys,
    setLoginPersistence,
    loginPersistence,
    isVerifyOpen,
    setIsVerifyOpen,
    logOut,
    delAcc,
    setDelAcc,
    currYear,
    setCurrYear,
    skeletonPosts,
    homePosts,
    setHomePosts,
    homeLoading,
    setHomeLoading,
    setHomeLastDocTime,
    homeLastDocTime,
    fetchMoreHomePosts,
    userPostsLoading,
    setUserPostsLoading,
    setUserLastDocTime,
    userLastDocTime,
    fetchMoreUserPosts,
    targetUserId,
    setTargetUserId,
    userPosts,
    setUserPosts,
    authLoading,
    setAuthLoading,
  };

  // * Fetches
  useEffect(() => {
    // *Fetches Categories
    let categ: string[];
    (async () => {
      const snapQuery = query(collection(db, 'categories'));

      onSnapshot(snapQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          categ = doc.data().categ as string[];
        });
        dispatch(setCateg(categ));
      });
    })();

    // *Listens to any addition or removal from posts
    const postsRef = collection(db, 'posts');
    onSnapshot(
      postsRef,
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (!delayListener.current) {
            if (change.type === 'added') {
              const post = change.doc.data();
              const modPost = {
                ...post,
                publishedAt: post.publishedAt
                  ? post.publishedAt.toDate().toString()
                  : '',
              } as PostInt;
              setHomePosts((prev) => [modPost, ...prev]);
            }
            if (change.type === 'modified') {
              const post = change.doc.data();
              const modPost = {
                ...post,
                publishedAt: post.publishedAt
                  ? post.publishedAt.toDate().toString()
                  : '',
              } as PostInt;
              setHomePosts((prev) =>
                prev.map((p) =>
                  p.postId === modPost.postId ? { ...modPost } : p
                )
              );
            }
            if (change.type === 'removed') {
              const post = change.doc.data();
              setHomePosts((prev) =>
                prev.filter((p) => !p.postId === post.postId)
              );
            }
          }
        });
      },
      (error) => {
        console.log(`Home posts listener error: ${error}`);
      }
    );

    // *Fetches initial first batch of posts
    (async () => {
      try {
        const res = await blogServices.getPosts(false, null);
        let posts: any[] = [];

        res.forEach((doc) => {
          const post = doc.data();
          posts.push({
            ...post,
            publishedAt: post.publishedAt
              ? post.publishedAt.toDate().toString()
              : '',
            createdAt: post.createdAt ? post.createdAt.toDate().toString() : '',
          });
        });

        const lastDocTime = res.docs[res.docs.length - 1]
          ? res.docs[res.docs.length - 1].data().publishedAt
          : null;
        lastDocTime && setHomeLastDocTime(lastDocTime as Timestamp);

        setHomePosts(posts as PostInt[]);
      } catch (err) {
        console.log('Home post inital fetch failed: ', err);
      } finally {
        setHomeLoading(false);
        delayListener.current = false;
      }
    })();
  }, []);

  useEffect(() => {
    // *Get UserInfo on login

    if (isSuccessLogin) {
      const email = auth.currentUser?.email ?? '';
      let userInfo;

      (async () => {
        try {
          const snapQuery = query(
            collection(db, 'users'),
            where('email', '==', email)
          );

          onSnapshot(snapQuery, (querySnapshot) => {
            console.log('USERINFO SNAP FIRED');

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

            if (isInitial.current) {
              dispatch(setIsUserLoggedIn(true));
              dispatch(setIsJustLoggedIn(true));
              isInitial.current = false;
            }

            !querySnapshot.size && dispatch(setNoUserInfo(true));
          });
        } catch (error) {
          await blogServices.logOut();
          setAuthError(error);
          console.log(`Get user info ${error}`);
        } finally {
          dispatch(resetIsLogInLoading());
          dispatch(resetIsSuccessLogin());
        }
      })();
    }
  }, [isSuccessLogin, auth.currentUser]);

  useEffect(() => {
    if (isUserLoggedIn && userInfo) {
      setCountry(userInfo.country);
      setState(userInfo.state);
      setGender(userInfo.gender);
    }
  }, [isUserLoggedIn, userInfo]);

  useEffect(() => {
    StorageFuncs.setStorage(
      'local',
      'devie_login_persistence',
      loginPersistence
    );

    auth.setPersistence(
      loginPersistence ? browserLocalPersistence : browserSessionPersistence
    );
  }, [loginPersistence]);

  useEffect(() => {
    if (userInfo) {
      StorageFuncs.setStorage<UserInfoInt>(
        loginPersistence ? 'local' : 'session',
        storageKeys.currUser,
        userInfo
      );
    }
  }, [userInfo, loginPersistence]);

  useEffect(() => {
    (async () => {
      try {
        await blogServices.setTime();
        const res = await blogServices.getTime();
        const time = res.data() as any;
        setCurrYear(time.time.toDate().toString().split(' ')[3]);
      } catch (err) {
        console.error(`Time fetch ${err}`);
      }
    })();
  }, []);

  useEffect(() => {
    const isUserInfo = StorageFuncs.getStorage<boolean>(
      loginPersistence ? 'local' : 'session',
      storageKeys.isUserInfo
    );

    // * User log in variable is true, then save info in storage
    if (isUserLoggedIn) {
      StorageFuncs.setStorage<boolean>(
        loginPersistence ? 'local' : 'session',
        storageKeys.isUserInfo,
        !noUserInfo
      );
    }

    // * User log in variable is false, and isUserInfo in storage is false (not null)
    if (!isUserLoggedIn && !isUserInfo && typeof isUserInfo === 'boolean') {
      dispatch(setNoUserInfo(!isUserInfo));
    }
  }, [noUserInfo, loginPersistence, isUserLoggedIn]);

  useEffect(() => {
    if (StorageFuncs.checkStorage('local', storageKeys.theme))
      dispatch(
        setTheme(
          StorageFuncs.getStorage<string>('local', storageKeys.theme) ?? ''
        )
      );
    else StorageFuncs.setStorage('local', storageKeys.theme, 'light');
  }, []);

  return (
    <BlogContext.Provider value={sharedProps}>{children}</BlogContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(BlogContext);
};
