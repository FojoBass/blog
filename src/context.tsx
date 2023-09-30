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

interface ContextInt {
  searchString?: string;
  setSearchString?: Dispatch<React.SetStateAction<string>>;
  isSearch?: boolean;
  setIsSearch?: Dispatch<React.SetStateAction<boolean>>;
  setLoginPersistence?: Dispatch<React.SetStateAction<boolean>>;
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
  storageKeys?: { currUser: string };
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

  const [loginPersistence, setLoginPersistence] = useState(
    StorageFuncs.getStorage<boolean>('local', 'devie_login_persistence')
  );

  const { userInfo } = useBlogSelector((state) => state.user);

  const [storageKeys] = useState({
    currUser: 'devie_current_user',
  });

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
        'local',
        storageKeys.currUser,
        userInfo
      );
    }
    console.log('userInfo: ', userInfo);
  }, [userInfo]);

  return (
    <BlogContext.Provider value={sharedProps}>{children}</BlogContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(BlogContext);
};
