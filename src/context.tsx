import { useContext, useState, createContext } from 'react';

interface ContextInt {
  isUserLogged?: boolean;
}

const BlogContext = createContext<ContextInt>({});

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isUserLogged, setIsUserLogged] = useState(true); //todo This will be changed once auth is setup

  const sharedProps: ContextInt = { isUserLogged };

  return (
    <BlogContext.Provider value={sharedProps}>{children}</BlogContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(BlogContext);
};
