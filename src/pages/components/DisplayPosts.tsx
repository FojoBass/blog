import React, { useState, useEffect } from 'react';
import { SkeletonLoad, SinglePost } from './index';
import dummyImg from '../../assets/Me cropped.jpg';
import { DummyPostsInt, PostInt, SearchFollowsInt } from '../../types';
import { useGlobalContext } from '../../context';
import { v4 } from 'uuid';

interface PropInt {
  posts: DummyPostsInt[] | PostInt[] | SearchFollowsInt[];
  target: 'home' | 'search' | 'profile';
}

const DisplayPosts: React.FC<PropInt> = ({ posts, target }) => {
  const {
    homeLoading,
    setHomePosts,
    setUserPosts,
    skeletonPosts,
    fetchMoreHomePosts,
    userPostsLoading,
    fetchMoreUserPosts,
    searchLoading,
    setSearchResults,
    fetchSearchResults,
    searchString,
    filters,
    orderBy,
  } = useGlobalContext();

  const handleLoadMore = () => {
    switch (target) {
      case 'home':
        skeletonPosts &&
          setHomePosts &&
          setHomePosts((prev) => [...prev, ...skeletonPosts]);
        fetchMoreHomePosts && fetchMoreHomePosts();
        break;
      case 'profile':
        skeletonPosts &&
          setUserPosts &&
          setUserPosts((prev) => [...prev, ...skeletonPosts]);
        fetchMoreUserPosts && fetchMoreUserPosts();
        break;
      case 'search':
        skeletonPosts &&
          setSearchResults &&
          setSearchResults((prev) => [...prev, ...skeletonPosts]);
        fetchSearchResults &&
          fetchSearchResults(
            filters ?? '',
            orderBy ?? '',
            searchString ?? '',
            true
          );
        break;
      default:
        return;
    }
  };

  return (
    <main className='main_side'>
      {!posts.length ? (
        <h3 className='empty_data'>No Posts</h3>
      ) : (
        <>
          {posts.map((post) =>
            post.isDummy ? (
              <div key={(post as DummyPostsInt).postId}>
                <SkeletonLoad />
              </div>
            ) : (
              <SinglePost
                key={(post as PostInt).postId ?? v4()}
                posterName={(post as PostInt).author}
                avi={(post as PostInt).aviUrl}
                title={(post as PostInt).title}
                detail={(post as PostInt)?.desc ?? ''}
                date={(post as PostInt).publishedAt as string}
                category={(post as PostInt)?.selCategs ?? []}
                postImgUrl={(post as PostInt).bannerUrl}
                id={(post as PostInt).postId}
                followersCount={(post as PostInt).followers}
                aboutPoster={(post as PostInt).bio}
                uid={(post as PostInt).uid}
                bookmarks={(post as PostInt).bookmarks}
                isHome={target === 'home'}
              />
            )
          )}

          <button
            className={`load_more_btn ${
              target === 'home' && homeLoading
                ? 'disable'
                : target === 'profile' && userPostsLoading
                ? 'disable'
                : target === 'search' && searchLoading
                ? 'disable'
                : ''
            }`}
            disabled={
              target === 'home' && homeLoading
                ? true
                : target === 'profile' && userPostsLoading
                ? true
                : target === 'search' && searchLoading
                ? true
                : false
            }
            onClick={handleLoadMore}
          >
            {target === 'home' && homeLoading
              ? 'Loading...'
              : target === 'profile' && userPostsLoading
              ? 'Loading...'
              : target === 'search' && searchLoading
              ? 'Loading...'
              : 'Load more'}
          </button>
        </>
      )}
    </main>
  );
};

export default DisplayPosts;
