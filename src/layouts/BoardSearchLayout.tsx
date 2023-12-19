import React, { FC, ReactNode, useEffect, useState, useRef } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { v4 } from 'uuid';
import SearchForm from '../pages/components/SearchForm';
import { useGlobalContext } from '../context';
import { useBlogSelector } from '../app/store';

interface BSLInt {
  isPosts: PostInt;
  heading: string;
  navItems?: NavInt[];
  children?: ReactNode;
  filterItems?: { filters: string[]; sort: string[] };
  modClass?: string;
  isSearch: boolean;
  isSettings: boolean;
  isDashboard?: boolean;
  className?: string;
}

export interface NavInt {
  title: string;
  count?: number;
  url: string;
}

export interface PostInt {
  status: boolean;
  items: { count: number; title: string }[];
}

const BoardSearchLayout: FC<BSLInt> = ({
  isPosts,
  heading,
  navItems,
  children,
  filterItems,
  modClass,
  isSearch,
  className,
  isSettings,
  isDashboard,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isUserLoggedIn } = useBlogSelector((state) => state.user);

  const {
    searchString,
    filters,
    orderBy,
    setFilters,
    setOrderBy,
    skeletonPosts,
    setSearchResults,
    fetchSearchResults,
  } = useGlobalContext();

  const handleFilterChange = (item: string) => {
    setSearchParams({
      s: searchString ? searchString : '',
      filters: item,
      orderBy: orderBy ?? '',
    });

    skeletonPosts && setSearchResults && setSearchResults([...skeletonPosts]);
    fetchSearchResults &&
      fetchSearchResults(item, orderBy ?? '', searchString ?? '', false);
  };

  const handleSortChange = (item: string) => {
    setSearchParams({
      s: searchString ? searchString : '',
      filters: filters ?? '',
      orderBy: item,
    });

    skeletonPosts && setSearchResults && setSearchResults([...skeletonPosts]);
    fetchSearchResults &&
      fetchSearchResults(filters ?? '', item, searchString ?? '', false);
  };

  useEffect(() => {
    if (!isSettings && !isDashboard) {
      if (!searchParams.get('filters'))
        setSearchParams(
          {
            s: searchString ? searchString : '',
            filters: filters ?? '',
            orderBy: orderBy ?? '',
          },
          { replace: true }
        );
      else {
        if (setFilters && setOrderBy) {
          setFilters(searchParams.get('filters') ?? '');
          setOrderBy(searchParams.get('orderBy') ?? '');
        }
      }

      if (
        searchParams.get('filters') &&
        searchParams.get('filters') !== 'posts' &&
        searchParams.get('filters') !== 'users' &&
        searchParams.get('filters') !== 'my posts only' &&
        setFilters
      ) {
        setFilters('posts');
        console.log('STOP MESSING WITH THE SEARCH PARAMS');
      }

      if (
        searchParams.get('orderBy') &&
        searchParams.get('orderBy') !== 'newest' &&
        searchParams.get('orderBy') !== 'oldest' &&
        setOrderBy
      ) {
        setOrderBy('newest');
        console.log('STOP MESSING WITH THE SEARCH PARAMS');
      }
    }
  }, [searchParams, isSettings]);

  return (
    <section id='bsl_sect' className={`gen_sect ${className ? className : ''}`}>
      <div className={`center_sect ${modClass ? modClass : ''}`}>
        <header className='bsl_header'>
          <h1 style={{ textTransform: 'capitalize' }}>{heading}</h1>

          {filterItems ? (
            <div className='sort_by_opts'>
              {filterItems.sort.map((item) => (
                <button
                  className={`sort_by_opt ${orderBy === item ? 'active' : ''}`}
                  key={v4()}
                  onClick={() => handleSortChange(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : (
            ''
          )}
        </header>

        {isSearch && <SearchForm />}

        <div className='bsl_nav'>
          {navItems
            ? navItems.map(({ url, count, title }) => (
                <NavLink to={url} className='nav_opt' key={v4()}>
                  {title}{' '}
                  {count ? `(${count})` : count === 0 ? `(${count})` : ''}
                </NavLink>
              ))
            : filterItems
            ? filterItems.filters.map((item) =>
                item.includes('my posts only') ? (
                  isUserLoggedIn ? (
                    <button
                      className={`nav_opt ${item === filters ? 'active' : ''}`}
                      key={v4()}
                      onClick={() => handleFilterChange(item)}
                    >
                      {item}
                    </button>
                  ) : (
                    ''
                  )
                ) : (
                  <button
                    className={`nav_opt ${item === filters ? 'active' : ''}`}
                    key={v4()}
                    onClick={() => handleFilterChange(item)}
                  >
                    {item}
                  </button>
                )
              )
            : ''}
        </div>

        {isPosts.status && (
          <div className='bsl_boxes'>
            {isPosts.items.map(({ count, title }) => (
              <article className='bsl_box' key={v4()}>
                <span className='count'>{count}</span>
                {title}
              </article>
            ))}
          </div>
        )}

        <div className='bsl_main'>
          <aside className='side_bsl_nav_wrapper'>
            {navItems
              ? navItems.map(({ url, count, title }) => (
                  <NavLink to={url} className='side_bsl_nav' key={v4()}>
                    {title}{' '}
                    {count ? `(${count})` : count === 0 ? `(${count})` : ''}
                  </NavLink>
                ))
              : filterItems
              ? filterItems.filters.map((item) =>
                  item.includes('my posts only') ? (
                    isUserLoggedIn ? (
                      <button
                        className={`side_bsl_nav ${
                          item === filters ? 'active' : ''
                        }`}
                        key={v4()}
                        onClick={() => handleFilterChange(item)}
                      >
                        {item}
                      </button>
                    ) : (
                      ''
                    )
                  ) : (
                    <button
                      className={`side_bsl_nav ${
                        item === filters ? 'active' : ''
                      }`}
                      key={v4()}
                      onClick={() => handleFilterChange(item)}
                    >
                      {item}
                    </button>
                  )
                )
              : ''}
          </aside>
          <Outlet />
          {children ? children : ''}
        </div>
      </div>
    </section>
  );
};

export default BoardSearchLayout;
