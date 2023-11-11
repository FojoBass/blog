import React, { useState, useEffect } from 'react';
import { SkeletonLoad, SinglePost } from './index';
import dummyImg from '../../assets/Me cropped.jpg';
import { DummyPostsInt, PostInt } from '../../types';
import { useGlobalContext } from '../../context';

interface PropInt {
  posts: DummyPostsInt[] | PostInt[];
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
        console.log('Handle More for search');
        break;
      default:
        return;
    }
  };

  return posts.length ? (
    <main className='main_side'>
      {posts.map((post) =>
        post.isDummy ? (
          <div key={post.postId}>
            <SkeletonLoad />
          </div>
        ) : (
          <SinglePost
            key={post.postId}
            posterName={(post as PostInt).author}
            avi={(post as PostInt).aviUrl}
            title={(post as PostInt).title}
            detail={(post as PostInt)?.desc ?? ''}
            date={(post as PostInt).publishedAt as string}
            category={(post as PostInt)?.selCategs ?? []}
            postImgUrl={(post as PostInt).bannerUrl}
            id={post.postId}
            followersCount={(post as PostInt).followers}
            aboutPoster={(post as PostInt).bio}
            uid={(post as PostInt).uid}
            bookmarks={(post as PostInt).bookmarks}
          />
        )
      )}

      <button
        className={`load_more_btn ${
          target === 'home' && homeLoading
            ? 'disable'
            : target === 'profile' && userPostsLoading
            ? 'disable'
            : ''
        }`}
        disabled={
          target === 'home' && homeLoading
            ? true
            : target === 'profile' && userPostsLoading
            ? true
            : false
        }
        onClick={handleLoadMore}
      >
        {target === 'home' && homeLoading
          ? 'Loading...'
          : target === 'profile' && userPostsLoading
          ? 'Loading...'
          : 'Load more'}
      </button>
    </main>
  ) : (
    <div>No Post</div>
  );
};

export default DisplayPosts;
