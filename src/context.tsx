import {
  Dispatch,
  useContext,
  useState,
  createContext,
  useEffect,
} from 'react';
import { CountryInt, UserInfoInt } from './types';
import { useBlogDispatch, useBlogSelector } from './app/store';
import { StorageFuncs } from './services/storages';
import { auth } from './services/firebase/config';
import {
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { userSlice } from './features/userSlice';

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
  };
}

const BlogContext = createContext<ContextInt>({});

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchString, setSearchString] = useState(''),
    [isSearch, setIsSearch] = useState(false),
    [filters, setFilters] = useState('posts'),
    [orderBy, setOrderBy] = useState('newest');
  const [gender, setGender] = useState('male');
  const [country, setCountry] = useState({ name: '', code: '' }),
    [state, setState] = useState('');
  const [aviBigFile, setAviBigFile] = useState<File | null>(null),
    [aviSmallFile, setAviSmallFile] = useState<File | null>(null);
  const [isVerifyOpen, setIsVerifyOpen] = useState(true);

  const [storageKeys] = useState({
    currUser: 'devie_current_user',
    logPers: 'devie_login_persistence',
    isUserInfo: 'isUserInfo',
    userInfoData: 'user_info_data',
  });

  const [loginPersistence, setLoginPersistence] = useState(
    StorageFuncs.getStorage<boolean>('local', storageKeys.logPers) ?? false
  );

  const { userInfo, noUserInfo, isUserLoggedIn } = useBlogSelector(
    (state) => state.user
  );
  const dispatch = useBlogDispatch();

  const { setNoUserInfo } = userSlice.actions;

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
  };

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

  return (
    <BlogContext.Provider value={sharedProps}>{children}</BlogContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(BlogContext);
};
