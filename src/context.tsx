import { Dispatch, useContext, useState, createContext } from 'react';

interface ContextInt {
  isUserLogged?: boolean;
  searchString?: string;
  setSearchString?: Dispatch<React.SetStateAction<string>>;
  isSearch?: boolean;
  setIsSearch?: Dispatch<React.SetStateAction<boolean>>;
  filters?: string;
  setFilters?: Dispatch<React.SetStateAction<string>>;
  orderBy?: string;
  setOrderBy?: Dispatch<React.SetStateAction<string>>;
}

const BlogContext = createContext<ContextInt>({});

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isUserLogged, setIsUserLogged] = useState(!false); //todo This will be changed once auth is setup
  const [searchString, setSearchString] = useState(''),
    [isSearch, setIsSearch] = useState(false),
    [filters, setFilters] = useState('posts'),
    [orderBy, setOrderBy] = useState('newest');

  const sharedProps: ContextInt = {
    isUserLogged,
    searchString,
    setSearchString,
    isSearch,
    setIsSearch,
    filters,
    setFilters,
    orderBy,
    setOrderBy,
  };

  return (
    <BlogContext.Provider value={sharedProps}>{children}</BlogContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(BlogContext);
};
