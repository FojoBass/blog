import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';
import { useSearchParams } from 'react-router-dom';
import BoardSearchLayout from '../layouts/BoardSearchLayout';
import { DummyPostsInt, FollowsInt, PostInt } from '../types';
import { v4 } from 'uuid';
import { DisplayPosts, DisplayUsers } from './components';
import ShortUniqueId from 'short-unique-id';

const Search = () => {
  const {
    searchString,
    setSearchString,
    setIsSearch,
    isSearch,
    filters,
    orderBy,
    fetchSearchResults,
    searchResults,
    skeletonPosts,
    setSearchResults,
  } = useGlobalContext();

  const randId = new ShortUniqueId({ length: 10 });
  const initialEntry = useRef(true);

  const [searchParams, setSearchParams] = useSearchParams();

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

      if (!initialEntry.current)
        fetchSearchResults &&
          fetchSearchResults(
            filters ?? '',
            orderBy ?? '',
            searchString ?? '',
            false
          );

      setIsSearch(false);
    }
  }, [isSearch]);

  useEffect(() => {
    const searchString = searchParams.get('s');
    const filters =
      searchParams.get('filters') === 'my posts only'
        ? 'posts'
        : searchParams.get('filters');
    const orderBy = searchParams.get('orderBy');

    if (initialEntry.current && filters && orderBy && searchString) {
      if (searchParams.get('filters') === 'my posts only')
        setSearchParams(
          {
            s: searchString ? searchString : '',
            filters: 'posts',
            orderBy: orderBy ?? '',
          },
          { replace: true }
        );

      setSearchString && setSearchString(searchString);

      fetchSearchResults &&
        fetchSearchResults(filters, orderBy, searchString, false);

      initialEntry.current = false;
    }
  }, [searchParams]);

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
        <DisplayPosts posts={searchResults ?? []} target={'search'} />
      ) : filters === 'users' ? (
        <DisplayUsers users={searchResults ?? []} type='search' />
      ) : filters === 'my posts only' ? (
        <DisplayPosts posts={searchResults ?? []} target={'search'} />
      ) : (
        ''
      )}
    </BoardSearchLayout>
  );
};

export default Search;
