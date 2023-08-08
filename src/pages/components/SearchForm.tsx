import React, { FormEvent } from 'react';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { useBlogSelector } from '../../app/store';

const SearchForm = () => {
  const { setSearchString, searchString, setIsSearch } = useGlobalContext();
  const { isUserLoggedIn } = useBlogSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchString && setIsSearch) {
      setIsSearch(true);
      navigate('/search');
    }
  };

  return (
    <form className='search_wrapper' onSubmit={handleSearchSubmit}>
      <input
        type='text'
        placeholder='Search...'
        value={searchString}
        onChange={(e) =>
          setSearchString ? setSearchString(e.target.value) : ''
        }
      />
      <button className='search_btn'>
        <CiSearch />
      </button>
    </form>
  );
};

export default SearchForm;
