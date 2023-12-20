import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { DummyPostsInt, PostInt } from '../../types';
import { Timestamp } from 'firebase/firestore';
import { useGlobalContext } from '../../context';
import UserPostsLoading from './UserPostsLoading';
import { BlogServices } from '../../services/firebase/blogServices';
import { useBlogSelector } from '../../app/store';

const UserPosts = () => {
  const { skeletonPosts, handlePostDel, handleSetEdit, isDelPostLoading } =
    useGlobalContext();

  const [allUserPosts, setAllUsersPosts] = useState<
    PostInt[] | DummyPostsInt[]
  >([...(skeletonPosts ?? [])]);
  const [isPostsFetching, setIsPostFetching] = useState(true);
  const [lastDocTime, setLastDocTime] = useState<Timestamp | null>(null);
  const blogServices = new BlogServices();
  const { userInfo } = useBlogSelector((state) => state.user);
  const isFetched = useRef(false);
  const [limitReached, setLimitReached] = useState(false);
  const fetchLimit = useRef(5);
  const [commentsCounts, setCommentsCounts] = useState<number[]>([]);
  const disableCommEff = useRef(false);

  const fetchUserPosts = async (isMore: boolean = false) => {
    try {
      const res = await blogServices.getUserPosts(
        isMore,
        lastDocTime,
        userInfo?.uid ?? '',
        false,
        fetchLimit.current
      );
      let posts: any[] = [];

      res.docs.forEach((doc) => {
        const post = doc.data();
        posts.push({
          ...post,
          publishedAt: post.publishedAt
            ? post.publishedAt.toDate().toString()
            : '',
          createdAt: post.createdAt.toDate().toString(),
        });
      });

      const modLastDocTime = res.docs[res.docs.length - 1]
        ? res.docs[res.docs.length - 1].data().createdAt
        : null;

      modLastDocTime && setLastDocTime(modLastDocTime as Timestamp);
      setAllUsersPosts((prev) => [...prev.filter((p) => !p.isDummy), ...posts]);
      res.size < fetchLimit.current && setLimitReached(true);
      isFetched.current = true;
    } catch (error) {
      console.log(`Fetching all users posts failed ${error}`);
    } finally {
      setIsPostFetching(false);
    }
  };

  const handleLoadMore = async () => {
    setIsPostFetching(true);
    setAllUsersPosts((prev) => [...prev, ...skeletonPosts!]);
    fetchUserPosts(true);
    disableCommEff.current = false;
  };

  useEffect(() => {
    isFetched.current || (userInfo && fetchUserPosts(false));

    return () => {
      isFetched.current = true;
    };
  }, [userInfo]);

  useEffect(() => {
    (async () => {
      if (!disableCommEff.current && !allUserPosts.find((p) => p.isDummy)) {
        let counts = [...commentsCounts];

        for (let i = commentsCounts.length; i < allUserPosts.length; i++) {
          try {
            const res = await blogServices.getComments(allUserPosts[i].postId);
            counts.push(res.size);
          } catch (error) {
            console.error(
              `Error fetching comments for post ${allUserPosts[i].postId}: ${error}`
            );
          }
        }

        setCommentsCounts(counts);
        disableCommEff.current = true;
      }
    })();
  }, [allUserPosts, commentsCounts]);

  return (
    <section className='user_posts'>
      {allUserPosts.length ? (
        <>
          {(allUserPosts as PostInt[]).map((post, index) =>
            post.isDummy ? (
              <UserPostsLoading key={post.postId} />
            ) : (
              <article className='user_post' key={post.postId}>
                <div className='left_sect'>
                  <Link
                    to={`/${post.uid}/${post.postId}`}
                    className='post_title'
                  >
                    {post.title}
                  </Link>
                  {post.isPublished && (
                    <p className='pub_details'>
                      <span>Published: </span>
                      {(post.publishedAt as string).split(' ')[1]}{' '}
                      {(post.publishedAt as string).split(' ')[2]}
                    </p>
                  )}
                </div>
                <div className='right_sect'>
                  {post.isPublished ? (
                    <div className='icons_info_wrapper'>
                      <article className='icon_info'>
                        <span className='icon_wrapper'>
                          <AiOutlineHeart />{' '}
                        </span>
                        {post.likes.length}
                      </article>

                      <article className='icon_info'>
                        <span className='icon_wrapper'>
                          <BiComment />{' '}
                        </span>
                        {commentsCounts[index]}
                      </article>

                      <article className='icon_info'>
                        <span className='icon_wrapper'>
                          <AiOutlineEye />{' '}
                        </span>
                        {post.views.length}
                      </article>
                    </div>
                  ) : (
                    <p className='pub_draft'>Draft</p>
                  )}

                  <div className='btns_wrapper'>
                    <button
                      className={`post_btn del_btn ${
                        !!isDelPostLoading?.find((d) => d === post.postId)
                          ? 'disable'
                          : ''
                      }`}
                      onClick={() =>
                        handlePostDel && handlePostDel(post, setAllUsersPosts)
                      }
                      disabled={
                        !!isDelPostLoading?.find((d) => d === post.postId)
                      }
                    >
                      {!!isDelPostLoading?.find((d) => d === post.postId)
                        ? 'Deleting'
                        : 'Delete'}
                    </button>
                    <button
                      className='post_btn'
                      onClick={() => handleSetEdit && handleSetEdit(post)}
                      disabled={
                        !!isDelPostLoading?.find((d) => d === post.postId)
                      }
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </article>
            )
          )}
          <button
            className={`load_more_btn ${
              isPostsFetching || limitReached ? 'disable' : ''
            }`}
            disabled={isPostsFetching || limitReached}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </>
      ) : (
        <h3 className='empty_data'>No Posts found!</h3>
      )}
    </section>
  );
};

export default UserPosts;
