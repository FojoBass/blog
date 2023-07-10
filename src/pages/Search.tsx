import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
import { useSearchParams } from 'react-router-dom';
import BoardSearchLayout from '../layouts/BoardSearchLayout';
import { FollowsInt, PostsInt } from '../types';
import { v4 } from 'uuid';
import { DisplayPosts, DisplayUsers } from './components';
import avi from '../assets/Me cropped.jpg';

const Search = () => {
  const {
    searchString,
    setSearchString,
    setIsSearch,
    isSearch,
    filters,
    orderBy,
    // setFilters,
  } = useGlobalContext();

  const [searchParams, setSearchParams] = useSearchParams();
  // TODO Placeholder for loading purposes
  const searchPosts: PostsInt[] = [
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
  ];

  const [dummyFollows] = React.useState<FollowsInt[]>([
    { userName: 'Dummy name', id: 'asdf', avi },
    { userName: 'Dummy name', id: 'asdfd', avi },
    { userName: 'Dummy name', id: 'asdfs', avi },
    { userName: 'Dummy name', id: 'asdf8', avi },
    { userName: 'Dummy name', id: 'asdfd4', avi },
    { userName: 'Dummy name', id: 'asdfsl', avi },
  ]);

  useEffect(() => {
    if (setSearchString && setIsSearch && isSearch) {
      setSearchParams(
        {
          s: searchString ? searchString : '',
          filters: filters ?? '',
          orderBy: orderBy ?? '',
        },
        { replace: true }
      );
      setIsSearch(false);
    }
  }, [isSearch]);

  return (
    <BoardSearchLayout
      isPosts={{ status: false, items: [] }}
      heading={'Search Results'}
      filterItems={{
        filters: ['posts', 'users', 'my posts only'],
        sort: ['newest', 'oldest'],
      }}
      isSearch={true}
      className={'search_sect'}
      isSettings={false}
    >
      {filters === 'posts' ? (
        <DisplayPosts posts={searchPosts} />
      ) : filters === 'users' ? (
        <DisplayUsers users={dummyFollows} />
      ) : filters === 'my posts only' ? (
        <DisplayPosts posts={searchPosts} />
      ) : (
        ''
      )}
    </BoardSearchLayout>
  );
};

export default Search;
