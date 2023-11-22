import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import {
  BsBookmarkDashFill,
  BsThreeDots,
  BsBookmarkPlus,
  BsDot,
} from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentInt, PostInt } from '../types';
import { useGlobalContext } from '../context';
import PostLoading from './components/PostLoading';
import { MdOutlineError } from 'react-icons/md';
import { BlogServices } from '../services/firebase/blogServices';
import { useBlogSelector } from '../app/store';
import { handleParsePost } from '../helpers/handleParsePost';
import DOMPurify from 'dompurify';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../services/firebase/config';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';

const Post = () => {
  const { uid: authorId, postId } = useParams();
  const { displayPostContent, setDisplayPostContent } = useGlobalContext();
  const [fetchingPost, setFetchingPost] = useState(true);
  const [modDate, setModDate] = useState({ day: '', month: '', year: '' });
  const { userInfo, isUserLoggedIn } = useBlogSelector((state) => state.user);
  const [mainPost, setMainPost] = useState('');
  const [fetch2, setFetch2] = useState(false);
  const navigate = useNavigate();
  const [morePosts, setMorePosts] = useState<PostInt[]>([]);
  const [nextPosts, setNextPosts] = useState<PostInt[]>([]);
  const [isNextPostsLoading, setIsNextPostsLoading] = useState(true);
  const [isBkm, setIsBkm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFollow = () => {
    if (!isUserLoggedIn) navigate('/enter');
    else {
      console.log('Follow');
    }
  };

  const fetchNextPosts = async () => {
    const categs = displayPostContent?.selCategs ?? [];
    let nextPosts: PostInt[] = [];

    try {
      const res = await new BlogServices().getRelatedPosts(
        categs,
        postId ?? ''
      );
      res.forEach((doc) => {
        const postInfo = doc.data();
        nextPosts.push({
          ...(postInfo as PostInt),
          createdAt: postInfo.createdAt.toDate().toString(),
          publishedAt: postInfo.publishedAt.toDate().toString(),
        });
      });

      setNextPosts(nextPosts);
    } catch (error) {
      console.log('Next Posts fetching failed: ', error);
    } finally {
      setIsNextPostsLoading(false);
    }
  };

  useEffect(() => {
    if (displayPostContent) {
      setIsBkm(
        Boolean(
          displayPostContent.bookmarks.find((bId) => bId === userInfo?.uid)
        )
      );

      setIsLiked(
        Boolean(displayPostContent.likes.find((lId) => lId === userInfo?.uid))
      );
    }
  }, [displayPostContent]);

  useEffect(() => {
    // TODO Fit in every variable where needed

    let unsub: () => void;
    let unsubMore: () => void;

    if (authorId && postId) {
      setFetchingPost(true);
      let postInfo: any;
      const q = query(collection(db, 'posts'), where('postId', '==', postId));
      const qm = query(
        collection(db, 'posts'),
        where('postId', '!=', postId),
        where('uid', '==', authorId)
      );
      unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          postInfo = doc.data();
        });

        if (!postInfo?.postId) {
          setFetch2(true);
          unsub();
        } else {
          postInfo &&
            setDisplayPostContent?.({
              ...(postInfo as PostInt),
              createdAt: postInfo.createdAt.toDate().toString(),
              publishedAt: postInfo.publishedAt.toDate().toString(),
            });
          setFetchingPost(false);
        }
      });

      unsubMore = onSnapshot(qm, (querySnapshot) => {
        let morePosts: PostInt[] = [];

        querySnapshot.forEach((doc) => {
          const postInfo = doc.data();
          morePosts.push({
            ...(postInfo as PostInt),
            createdAt: postInfo.createdAt.toDate().toString(),
            publishedAt: postInfo.publishedAt.toDate().toString(),
          });
        });

        setMorePosts(morePosts);
      });
    }
    return () => {
      unsub?.();
      unsubMore?.();
    };
  }, [postId]);

  useEffect(() => {
    let unsub2: () => void;

    if (fetch2) {
      let postInfo: any;
      const q2 = query(
        collection(db, `users/${authorId}/posts`),
        where('postId', '==', postId)
      );
      unsub2 = onSnapshot(q2, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          postInfo = doc.data();
        });

        postInfo &&
          setDisplayPostContent?.({
            ...(postInfo as PostInt),
            createdAt: postInfo.createdAt.toDate().toString(),
            publishedAt: postInfo?.publishedAt.toDate().toString(),
          });

        setFetchingPost(false);
      });
    }
    return () => unsub2?.();
  }, [fetch2]);

  useEffect(() => {
    if (displayPostContent) {
      let day: string;
      let month: string;
      let year: string;
      if (displayPostContent.isPublished) {
        day = (displayPostContent.publishedAt! as string).split(' ')[2];
        month = (displayPostContent.publishedAt! as string).split(' ')[1];
        year = (displayPostContent.publishedAt! as string).split(' ')[3];
      } else {
        day = (displayPostContent.createdAt as string).split(' ')[2];
        month = (displayPostContent.createdAt as string).split(' ')[1];
        year = (displayPostContent.createdAt as string).split(' ')[3];
      }
      setModDate({ day, month, year });

      setMainPost(handleParsePost(displayPostContent.post));

      displayPostContent.isPublished && fetchNextPosts();
    }
  }, [displayPostContent]);

  return (
    <section id='single_post_sect' className='gen_sect'>
      {fetchingPost ? (
        <PostLoading />
      ) : !displayPostContent ? (
        <div className='empty_post'>
          <span>
            <MdOutlineError />
          </span>
          <h3>Post not found</h3>
        </div>
      ) : (
        <div className='center_sect'>
          <aside className='left_side'>
            <Interactions
              type='like'
              count={displayPostContent.likes.length}
              post={displayPostContent}
              isInt={isLiked}
            />
            <Interactions
              type='comment'
              count={displayPostContent.commentsCount}
              commentEl={commentRef.current}
            />
            <Interactions
              type='bookmark'
              count={displayPostContent.bookmarks.length}
              isInt={isBkm}
              post={displayPostContent}
            />
            <button className='share_opts_btn'>
              <BsThreeDots />
            </button>
          </aside>

          <main className='mid_side'>
            <div className='top_super_wrapper'>
              <header className='mid_side_head'>
                <div className='img_wrapper main_img'>
                  <img src={displayPostContent.bannerUrl} alt='banner' />
                </div>

                <div className='poster'>
                  <Link
                    to={`/p/${displayPostContent.uid}`}
                    className='img_wrapper poster_avi'
                  >
                    <img src={displayPostContent.aviUrl} alt='author avi' />
                  </Link>
                  <div className='info'>
                    <Link to={`/p/${displayPostContent.uid}`}>
                      {displayPostContent.author}
                    </Link>
                    <p>
                      {displayPostContent.isPublished ? 'Posted' : 'Created'} on{' '}
                      {modDate.day} {modDate.month}, {modDate.year}
                    </p>
                  </div>
                </div>

                <h1 className='main_heading'>{displayPostContent.title}</h1>
                {displayPostContent.isPublished &&
                  displayPostContent.selCategs!.map((categ) => (
                    <Link
                      key={categ}
                      className='category'
                      to={`/categories/${categ}`}
                    >
                      {categ}
                    </Link>
                  ))}
              </header>

              <div
                className='main_post_wrapper'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(mainPost),
                }}
              ></div>

              <div className='comments_super_wrapper'>
                <h3>Comments ({displayPostContent.commentsCount})</h3>
                {isUserLoggedIn && (
                  <div className='make_comment_wrapper'>
                    <div className='img_wrapper'>
                      <img
                        src={userInfo?.aviUrls.smallAviUrl ?? ''}
                        alt='My avi'
                      />
                    </div>

                    <form className='comment_form'>
                      <textarea
                        name=''
                        id=''
                        placeholder='Contribute to discussion'
                        ref={commentRef}
                      ></textarea>
                      <button type='submit' className='spc_btn'>
                        Contribute
                      </button>
                    </form>
                  </div>
                )}

                <div className='comments_wrapper'>
                  {/* <Comment comments={comments} /> */}
                </div>
              </div>
            </div>

            {displayPostContent.isPublished && (
              <div className='read_next_sect'>
                <h2>Read next</h2>

                {isNextPostsLoading ? (
                  <div className='loading_spinner'>
                    <ImSpinner />
                  </div>
                ) : nextPosts.length ? (
                  nextPosts.map((post) => (
                    <Link
                      to={`/${post.uid}/${post.postId}`}
                      className='read_post'
                      key={post.postId}
                    >
                      <div className='img_wrapper'>
                        <img src={post.aviUrl} alt='Author avi' />
                      </div>
                      <div className='post_info'>
                        <h3 className='title'>{post.title}</h3>
                        <p className='more_info'>
                          {post.author} -{' '}
                          {(post.publishedAt as string).split(' ')[1]}{' '}
                          {(post.publishedAt as string).split(' ')[2]}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <h3 className='empty'>No Posts</h3>
                )}
              </div>
            )}

            <div className='poster_more'>
              <div className='about_poster'>
                <Link to={`/p/${displayPostContent.uid}`} className='top'>
                  <div className='img_wrapper'>
                    <img src={displayPostContent.aviUrl} alt="Author's avi" />
                  </div>
                  <p className='author'>{displayPostContent.author}</p>
                </Link>

                <div className='mid'>
                  {/* TODO YOU NEED SOME MANIPULATIONS HERE */}
                  <button className='follow_btn spc_btn' onClick={handleFollow}>
                    Follow
                  </button>
                  <p className='author_about'>{displayPostContent.bio}</p>
                </div>
              </div>

              {morePosts.length ? (
                <div className='author_posts'>
                  <h3>
                    More from{' '}
                    <Link to={`/p/${displayPostContent.uid}`}>
                      {displayPostContent.author}
                    </Link>
                  </h3>

                  {morePosts.map((post) => (
                    <Link
                      to={`/${post.uid}/${post.postId}`}
                      className='post'
                      key={post.postId}
                    >
                      <span className='post_title'>{post.title}</span>
                      {post.selCategs?.map((categ) => (
                        <span className='post_category' key={categ}>
                          {categ}
                        </span>
                      ))}
                    </Link>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>

            <footer className='fixed_bottom'>
              <Interactions
                type='like'
                count={displayPostContent.likes.length}
                post={displayPostContent}
                isInt={isLiked}
              />
              <Interactions
                type='comment'
                count={displayPostContent.commentsCount}
                commentEl={commentRef.current}
              />
              <Interactions
                type='bookmark'
                count={displayPostContent.bookmarks.length}
                post={displayPostContent}
                isInt={isBkm}
              />
              <button className='share_opts_btn'>
                <BsThreeDots />
              </button>
            </footer>
          </main>

          <aside className='right_side'>
            <div className='about_poster'>
              <Link to={`/p/${displayPostContent.uid}`} className='top'>
                <div className='img_wrapper'>
                  <img src={displayPostContent.aviUrl} alt="Author's avi" />
                </div>
                <p className='author'>{displayPostContent.author}</p>
              </Link>

              <div className='mid'>
                <button className='follow_btn spc_btn'>Follow</button>
                <p className='author_about'>{displayPostContent.bio}</p>
              </div>
            </div>

            {morePosts.length ? (
              <div className='author_posts'>
                <h3>
                  More from{' '}
                  <Link to={`/p/${displayPostContent.uid}`}>
                    {displayPostContent.author}
                  </Link>
                </h3>

                {morePosts.map((post) => (
                  <Link
                    to={`/${post.uid}/${post.postId}`}
                    className='post'
                    key={post.postId}
                  >
                    <span className='post_title'>{post.title}</span>
                    {post.selCategs?.map((categ) => (
                      <span className='post_category' key={categ}>
                        {categ}
                      </span>
                    ))}
                  </Link>
                ))}
              </div>
            ) : (
              <></>
            )}
          </aside>
        </div>
      )}
    </section>
  );
};

export interface InteractionsInt {
  type: string;
  count: number;
  isInt?: boolean;
  post?: PostInt;
  commentEl?: HTMLTextAreaElement | null;
}

interface CommentPropInt {
  comments: CommentInt[];
}

const Interactions: React.FC<InteractionsInt> = ({
  type,
  count,
  isInt,
  post,
  commentEl,
}) => {
  const { isUserLoggedIn, userInfo } = useBlogSelector((state) => state.user);
  const [isIntLoading, setIsIntLoading] = useState(false);
  const blogServices = new BlogServices();

  const interaction = async (list: string[]) => {
    let modList: string[] = [];
    if (isUserLoggedIn && isInt) {
      modList = [...list];
      modList = modList.filter((bId) => bId !== userInfo?.uid);
    }

    if (isUserLoggedIn && !isInt) {
      modList = [...list];
      if (!modList.find((bId) => bId === userInfo?.uid)) {
        modList.push(userInfo?.uid ?? '');
      } else return;
    }

    try {
      setIsIntLoading(true);
      await blogServices.updatePost(
        type === 'bookmark' ? { bookmarks: modList } : { likes: modList },
        post!.postId,
        true,
        post!.uid
      );
      await blogServices.updatePost(
        type === 'bookmark' ? { bookmarks: modList } : { likes: modList },
        post!.postId,
        false,
        post!.uid
      );
    } catch (error) {
      toast.error('Operation failed');
      console.log(
        `${type === 'bookmark' ? 'Bookmark' : 'Like'} operation error: ${error}`
      );
    } finally {
      setIsIntLoading(false);
    }
  };

  const handleIntClick = async () => {
    switch (type) {
      case 'bookmark':
        interaction(post!.bookmarks);
        break;
      case 'like':
        interaction(post!.likes);
        break;
      case 'comment':
        commentEl?.focus();
        break;
      default:
        return;
    }
  };

  return (
    <button
      className={`icon_wrapper 
      ${type} ${isIntLoading ? 'disable' : ''} ${isInt ? 'active' : ''}
      `}
      style={!isUserLoggedIn ? { pointerEvents: 'none' } : {}}
      onClick={handleIntClick}
      disabled={isIntLoading}
      title={
        type === 'bookmark'
          ? isInt
            ? 'Remove Bookmark'
            : 'Add Bookmark'
          : type === 'like'
          ? isInt
            ? 'Unlike Post'
            : 'Like Post'
          : type === 'comment'
          ? 'Make Comment'
          : ''
      }
    >
      {type === 'like' ? (
        isInt ? (
          <AiFillHeart />
        ) : (
          <AiOutlineHeart />
        )
      ) : type === 'comment' ? (
        <BiComment />
      ) : type === 'bookmark' ? (
        isInt ? (
          <BsBookmarkDashFill />
        ) : (
          <BsBookmarkPlus />
        )
      ) : (
        ''
      )}
      <span className='count_wrapper'>{count}</span>
    </button>
  );
};

// const Comment: React.FC<CommentPropInt> = ({ comments }) => {
//   return (
//     <>
//       {comments.map(({ id, reply, replies, likes, isFirstLevel }) => {
//         return (
//           <article
//             className='super_comment_wrapper'
//             key={id}
//             style={isFirstLevel ? { marginLeft: '10px' } : {}}
//           >
//             <div className='comment_wrapper'>
//               <Link to='/p/dummyUser' className='img_wrapper'>
//                 <img src={avatar} alt='' />
//               </Link>

//               <div className='wrapper'>
//                 <div className='main_comment'>
//                   <div className='top'>
//                     <Link to='/p/dummyUser'>Dummy User</Link>{' '}
//                     <span className='dot_seperator'>
//                       <BsDot />
//                     </span>{' '}
//                     <span className='created_at'>Feb 28</span>
//                   </div>

//                   <p className='main'>{reply}</p>
//                 </div>

//                 <div className='btns_wrapper'>
//                   <button className='like_btn'>
//                     <AiOutlineHeart />
//                     <span>{likes}</span>
//                   </button>

//                   <button className='reply_btn'>
//                     <BiComment />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <Comment comments={replies} />
//           </article>
//         );
//       })}
//     </>
//   );
// };

export default Post;
