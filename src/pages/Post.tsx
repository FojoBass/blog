import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import {
  BsBookmarkDashFill,
  BsThreeDots,
  BsBookmarkPlus,
  BsDot,
} from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  BookmarkInt,
  CommentDataInt,
  CommentInt,
  DateExtractInt,
  PostInt,
  UpdateCommentDataInt,
} from '../types';
import { useGlobalContext } from '../context';
import PostLoading from './components/PostLoading';
import {
  MdDeleteOutline,
  MdOutlineError,
  MdOutlineModeEdit,
} from 'react-icons/md';
import { BlogServices } from '../services/firebase/blogServices';
import { useBlogDispatch, useBlogSelector } from '../app/store';
import { handleParsePost } from '../helpers/handleParsePost';
import DOMPurify from 'dompurify';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '../services/firebase/config';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';
import { addFollow } from '../features/userAsyncThunk';
import ShortUniqueId from 'short-unique-id';
import { useDateExtractor } from './hooks/useDateExtractor';
import { FaAngleDown, FaAngleUp, FaUser } from 'react-icons/fa';
import { v4 } from 'uuid';
import useFetchPosterInfo from './hooks/useFetchPosterInfo';

const Post = () => {
  const { uid: authorId, postId } = useParams();
  const { displayPostContent, setDisplayPostContent } = useGlobalContext();
  const [fetchingPost, setFetchingPost] = useState(true);
  const modDate = useDateExtractor(
    displayPostContent?.isPublished
      ? displayPostContent.publishedAt!
      : displayPostContent?.createdAt!
  );
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
  const [isFollow, setIsFollow] = useState(false);
  const { followLoading } = useBlogSelector((state) => state.user);
  const dispatch = useBlogDispatch();
  const [isFetchingComments, setIsFetchingComments] = useState(true);
  const [comments, setComments] = useState<CommentInt[]>([]);
  const blogServices = new BlogServices();
  const viewsSet = useRef(false);
  const posterInfo = useFetchPosterInfo(authorId ?? '');

  const commentsByParentId = useMemo(() => {
    const group: Record<string, CommentInt[]> = {};
    comments.forEach((comment) => {
      group[comment.parentId ?? 'null'] ||= [];
      group[comment.parentId ?? 'null'].push(comment);
    });
    return group;
  }, [comments]);

  const getReplies = (parentId: string): CommentInt[] =>
    commentsByParentId[parentId];

  const handleFollow = () => {
    if (!isUserLoggedIn) navigate('/enter');
    else {
      dispatch(
        addFollow({
          isFollow,
          posterName: posterInfo?.userName ?? '',
          uid: displayPostContent!.uid,
          avi: posterInfo?.aviUrls.smallAviUrl ?? '',
        })
      );
    }
  };

  const fetchComments = async () => {
    if (displayPostContent) {
      const q = query(
        collection(db, `posts/${displayPostContent.postId}/comments`),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(q, async (querySnapshot) => {
        let modComments: any = [];
        querySnapshot.forEach((doc) => {
          const comData = doc.data();

          modComments.push({
            ...comData,
            createdAt: comData.createdAt?.toDate().toString(),
          });
        });

        try {
          let userInfos: any[] = [];
          for (let i = 0; i < modComments.length; i++) {
            let uData: any;
            const storedData = userInfos.find(
              (info) => info.uid === modComments[i].uid
            );
            if (!storedData) {
              uData = await blogServices.getUserInfo(
                modComments[i].uid as string
              );

              modComments[i] = {
                ...modComments[i],
                aviUrl: uData.data()?.aviUrls.smallAviUrl,
                replierName: uData.data()?.userName,
              };

              userInfos.push(uData.data());
            } else {
              modComments[i] = {
                ...modComments[i],
                aviUrl: storedData?.aviUrls.smallAviUrl,
                replierName: storedData?.userName,
              };
            }
          }

          setComments(modComments as CommentInt[]);
          setIsFetchingComments(false);
        } catch (error) {}
      });
    }
  };

  const fetchNextPosts = async () => {
    const categs = displayPostContent?.selCategs ?? [];
    let nextPosts: PostInt[] = [];

    try {
      const res = await blogServices.getRelatedPosts(categs, postId ?? '');
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
    } finally {
      setIsNextPostsLoading(false);
    }
  };

  useEffect(() => {
    const viewTimeout = setTimeout(async () => {
      if (displayPostContent?.isPublished && !viewsSet.current) {
        let modViews: string[] = [...displayPostContent.views];
        modViews.push(userInfo?.uid ?? v4());

        try {
          await blogServices.updatePost(
            { views: modViews },
            postId ?? '',
            false,
            authorId ?? ''
          );

          await blogServices.updatePost(
            { views: modViews },
            postId ?? '',
            true,
            ''
          );

          await blogServices.addLikesViews(
            authorId ?? '',
            userInfo?.uid + v4() ?? v4(),
            'views'
          );
        } catch (error) {
        } finally {
          viewsSet.current = true;
          clearTimeout(viewTimeout);
        }
      }
    }, 2000);

    return () => clearTimeout(viewTimeout);
  }, [postId, userInfo, authorId, displayPostContent]);

  useEffect(() => {
    if (displayPostContent && displayPostContent.postId === postId) {
      setIsBkm(
        Boolean(
          displayPostContent.bookmarks.find((bId) => bId === userInfo?.uid)
        )
      );

      setIsLiked(
        Boolean(displayPostContent.likes.find((lId) => lId === userInfo?.uid))
      );

      setComments([]);
      fetchComments();
    }
  }, [displayPostContent]);

  useEffect(() => {
    if (userInfo) {
      setIsFollow(!!userInfo.followings.find((flw) => flw.id === authorId));
    }
  }, [userInfo]);

  useEffect(() => {
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
      unsub2 = onSnapshot(
        q2,
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            postInfo = doc.data();
          });

          postInfo &&
            setDisplayPostContent?.({
              ...(postInfo as PostInt),
              createdAt: postInfo.createdAt.toDate().toString(),
              publishedAt: postInfo?.publishedAt
                ? postInfo?.publishedAt.toDate().toString()
                : '',
            });

          setFetchingPost(false);
        },
        (error) => {
          setFetchingPost(false);
          setDisplayPostContent && setDisplayPostContent(null);
        }
      );
    }
    return () => unsub2?.();
  }, [fetch2]);

  useEffect(() => {
    if (displayPostContent && displayPostContent.postId === postId) {
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
              count={comments.filter((com) => !com.isDelete).length}
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

                <div className='poster_info_more'>
                  <div className='poster'>
                    <Link
                      to={`/p/${displayPostContent.uid}`}
                      className='img_wrapper poster_avi'
                    >
                      {posterInfo ? (
                        <img
                          src={posterInfo.aviUrls.smallAviUrl}
                          alt='author avi'
                        />
                      ) : (
                        <span className='loading_spinner'>
                          <ImSpinner />
                        </span>
                      )}
                    </Link>
                    <div className='info'>
                      <Link to={`/p/${displayPostContent.uid}`}>
                        {posterInfo ? (
                          posterInfo.userName
                        ) : (
                          <span className='loading_spinner'>
                            <ImSpinner />
                          </span>
                        )}
                      </Link>
                      <p>
                        {displayPostContent.isPublished ? 'Posted' : 'Created'}{' '}
                        on {modDate.day} {modDate.month}, {modDate.year}
                      </p>
                    </div>
                  </div>

                  {displayPostContent.isPublished || (
                    <p className='pub_draft'>Draft</p>
                  )}
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

              {displayPostContent.isPublished && (
                <div className='comments_super_wrapper'>
                  <h3>
                    Comments ({comments.filter((com) => !com.isDelete).length})
                  </h3>
                  {isUserLoggedIn && (
                    <div className='make_comment_wrapper'>
                      <div className='img_wrapper'>
                        <img
                          src={userInfo?.aviUrls.smallAviUrl ?? ''}
                          alt='My avi'
                        />
                      </div>

                      <CommentForm commentRef={commentRef} />
                    </div>
                  )}

                  <div className='comments_wrapper'>
                    {isFetchingComments ? (
                      <div className='loading_spinner'>
                        <ImSpinner />
                      </div>
                    ) : (
                      <Comment
                        comments={getReplies('null')}
                        getReplies={getReplies}
                        commentsByParentId={commentsByParentId}
                      />
                    )}
                  </div>
                </div>
              )}
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
                        {posterInfo ? (
                          <img
                            src={posterInfo.aviUrls.smallAviUrl}
                            alt='Author avi'
                          />
                        ) : (
                          <span className='loading_spinner'>
                            <ImSpinner />
                          </span>
                        )}
                      </div>
                      <div className='post_info'>
                        <h3 className='title'>{post.title}</h3>
                        <p className='more_info'>
                          {posterInfo?.userName} -{' '}
                          {(post.publishedAt as string).split(' ')[1]}{' '}
                          {(post.publishedAt as string).split(' ')[2]}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <h3 className='empty_data'>No Post</h3>
                )}
              </div>
            )}

            <div className='poster_more'>
              <div className='about_poster'>
                <Link to={`/p/${displayPostContent.uid}`} className='top'>
                  <div className='img_wrapper'>
                    {posterInfo ? (
                      <img
                        src={posterInfo.aviUrls.smallAviUrl}
                        alt='Author avi'
                      />
                    ) : (
                      <span className='loading_spinner'>
                        <ImSpinner />
                      </span>
                    )}
                  </div>
                  <p className='author'>
                    {posterInfo ? (
                      posterInfo.userName
                    ) : (
                      <span className='loading_spinner'>
                        <ImSpinner />
                      </span>
                    )}
                  </p>
                </Link>

                <div className='mid'>
                  {userInfo?.uid !== displayPostContent.uid && (
                    <button
                      className={`follow_btn spc_btn ${
                        followLoading ? 'loading' : ''
                      }`}
                      onClick={handleFollow}
                    >
                      {isFollow ? 'Unfollow' : 'Follow'}
                    </button>
                  )}
                  <p className='author_about'>
                    {posterInfo ? (
                      posterInfo.bio
                    ) : (
                      <span className='loading_spinner'>
                        <ImSpinner />
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {morePosts.length ? (
                <div className='author_posts'>
                  <h3>
                    More from{' '}
                    <Link to={`/p/${displayPostContent.uid}`}>
                      {posterInfo ? (
                        posterInfo.userName
                      ) : (
                        <span className='loading_spinner'>
                          <ImSpinner />
                        </span>
                      )}
                    </Link>
                  </h3>

                  {morePosts.map((post) => (
                    <Link
                      to={`/${post.uid}/${post.postId}`}
                      className='post'
                      key={post.postId}
                    >
                      <span className='post_title'>{post.title}</span>
                      <div className='post_categ_wrapper'>
                        {post.selCategs?.map((categ) => (
                          <span className='post_category' key={categ}>
                            {categ}
                          </span>
                        ))}
                      </div>
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
                count={comments.filter((com) => !com.isDelete).length}
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
                  {posterInfo ? (
                    <img
                      src={posterInfo.aviUrls.smallAviUrl}
                      alt="Author's avi"
                    />
                  ) : (
                    <span className='loading_spinner'>
                      <ImSpinner />
                    </span>
                  )}
                </div>
                <p className='author'>
                  {posterInfo ? (
                    posterInfo.userName
                  ) : (
                    <span className='loading_spinner'>
                      <ImSpinner />
                    </span>
                  )}
                </p>
              </Link>

              <div className='mid'>
                {userInfo?.uid !== displayPostContent.uid && (
                  <button
                    className={`follow_btn spc_btn ${
                      followLoading ? 'loading' : ''
                    }`}
                    onClick={handleFollow}
                  >
                    {isFollow ? 'Unfollow' : 'Follow'}
                  </button>
                )}
                <p className='author_about'>
                  {posterInfo ? (
                    posterInfo.bio
                  ) : (
                    <span className='loading_spinner'>
                      <ImSpinner />
                    </span>
                  )}
                </p>
              </div>
            </div>

            {morePosts.length ? (
              <div className='author_posts'>
                <h3>
                  More from{' '}
                  <Link to={`/p/${displayPostContent.uid}`}>
                    {posterInfo ? (
                      posterInfo.userName
                    ) : (
                      <span className='loading_spinner'>
                        <ImSpinner />
                      </span>
                    )}
                  </Link>
                </h3>

                {morePosts.map((post) => (
                  <Link
                    to={`/${post.uid}/${post.postId}`}
                    className='post'
                    key={post.postId}
                  >
                    <span className='post_title'>{post.title}</span>
                    <div className='post_categ_wrapper'>
                      {post.selCategs?.map((categ) => (
                        <span className='post_category' key={categ}>
                          {categ}
                        </span>
                      ))}
                    </div>
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
  getReplies: (parentId: string) => CommentInt[];
  commentsByParentId: Record<string, CommentInt[]>;
}

interface CommentFormInt {
  commentRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
  setShowReply?: React.Dispatch<React.SetStateAction<boolean>>;
  showReply?: boolean;
  parentId?: null | string;
  edit?: { state: boolean; comment: string; commentId: string };
  setEdit?: React.Dispatch<
    React.SetStateAction<{ state: boolean; comment: string; commentId: string }>
  >;
}

interface SingleCommentInt extends CommentInt {
  getReplies: (parentId: string) => CommentInt[];
  commentsByParentId: Record<string, CommentInt[]>;
}

const Interactions: React.FC<InteractionsInt> = ({
  type,
  count,
  isInt,
  post,
  commentEl,
}) => {
  const { isUserLoggedIn, userInfo, followLoading } = useBlogSelector(
    (state) => state.user
  );
  const [isIntLoading, setIsIntLoading] = useState(false);
  const blogServices = new BlogServices();

  const interaction = async (list: string[]) => {
    let modList: string[] = [...list];
    let modBkms: BookmarkInt[] = [];
    if (isUserLoggedIn) {
      if (isInt) {
        modList = modList.filter((bId) => bId !== userInfo?.uid);

        if (type === 'bookmark' && userInfo) {
          modBkms = userInfo.bookmarks;
          modBkms = modBkms.filter((bkm) => bkm.postId !== post?.postId);
        }
      }

      if (!isInt) {
        if (!modList.find((bId) => bId === userInfo?.uid)) {
          modList.push(userInfo?.uid ?? '');
        } else return;

        if (type === 'bookmark' && userInfo) {
          if (!modBkms.find((bkm) => bkm.postId === post?.postId))
            modBkms.push({ postId: post?.postId ?? '', uid: post?.uid ?? '' });
          else return;
        }
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
        type === 'bookmark' &&
          (await blogServices.updateBookmarks(userInfo?.uid ?? '', {
            bookmarks: modBkms,
          }));

        if (type === 'like') {
          !isInt &&
            (await blogServices.addLikesViews(
              post?.uid ?? '',
              userInfo?.uid ?? '',
              'likes'
            ));

          isInt &&
            (await blogServices.removeLikes(
              post?.uid ?? '',
              userInfo?.uid ?? ''
            ));
        }
      } catch (error) {
        toast.error('Operation failed');
      } finally {
        setIsIntLoading(false);
      }
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
      className={`icon_wrapper ${type} ${isIntLoading ? 'disable' : ''} ${
        isInt ? 'active' : ''
      }
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

const Comment: React.FC<CommentPropInt> = ({
  comments,
  getReplies,
  commentsByParentId,
}) => {
  return (
    <>
      {comments?.map(
        ({
          commentId,
          uid,
          aviUrl,
          replierName,
          likes,
          comment,
          createdAt,
          parentId,
          isDelete,
        }) => {
          return (
            <SingleComment
              commentId={commentId}
              uid={uid}
              aviUrl={aviUrl}
              replierName={replierName}
              likes={likes}
              comment={comment}
              createdAt={createdAt}
              parentId={parentId}
              key={commentId}
              getReplies={getReplies}
              commentsByParentId={commentsByParentId}
              isDelete={isDelete}
            />
          );
        }
      )}
    </>
  );
};

const SingleComment: React.FC<SingleCommentInt> = ({
  commentId,
  uid,
  aviUrl,
  replierName,
  likes,
  comment,
  createdAt,
  parentId,
  getReplies,
  commentsByParentId,
  isDelete,
}) => {
  const modDate = useDateExtractor(createdAt);
  const [showReply, setShowReply] = useState(false);
  const replyRef = useRef<HTMLTextAreaElement | null>(null);
  const childReplies = useMemo(() => {
    return getReplies(commentId);
  }, [commentsByParentId]);
  const [showNest, setShowNest] = useState(false);
  const { userInfo, isUserLoggedIn } = useBlogSelector((state) => state.user);
  const [isLiking, setIsLiking] = useState(false);
  const isLiked = useMemo(() => {
    return !!likes.find((id) => id === userInfo?.uid);
  }, [likes]);
  const blogServices = new BlogServices();
  const { postId } = useParams();
  const [edit, setEdit] = useState({ state: false, comment, commentId });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCommentLike = async () => {
    let modLikes = [...likes];
    if (isUserLoggedIn) {
      if (isLiked) {
        modLikes = modLikes.filter((id) => id !== userInfo?.uid);
      }

      if (!isLiked) {
        if (!modLikes.find((id) => id === userInfo?.uid))
          modLikes.push(userInfo?.uid ?? '');
        else return;
      }

      try {
        setIsLiking(true);
        await blogServices.updateComment(
          { likes: modLikes },
          postId ?? '',
          commentId
        );
      } catch (error) {
        toast.error('Operation failed');
      } finally {
        setIsLiking(false);
      }
    }
  };

  const handleSetEditComment = () => {
    setShowReply(true);
    setEdit({ state: true, comment, commentId });
  };

  const handleDeleteComment = async () => {
    try {
      setIsDeleting(true);
      await blogServices.updateComment(
        { isDelete: true },
        postId ?? '',
        commentId
      );
    } catch (error) {
      toast.error('Deleting failed', { toastId: 'del_comm' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className='super_comment_wrapper' key={commentId}>
      <div className='comment_wrapper'>
        {isDelete ? (
          <span className='img_wrapper'>
            <span className='img_icon'>
              <FaUser />
            </span>
          </span>
        ) : (
          <Link to={`/p/${uid}`} className='img_wrapper'>
            <img src={aviUrl} alt='avi' />
          </Link>
        )}

        <div className='wrapper'>
          {isDelete ? (
            <div className='main_comment del'>
              <p className='main'>Comment deleted</p>
            </div>
          ) : (
            <>
              <div className='main_comment'>
                <div className='top'>
                  <Link to={`/p/${uid}`}>{replierName}</Link>{' '}
                  <span className='dot_seperator'>
                    <BsDot />
                  </span>{' '}
                  <span className='created_at'>
                    {modDate.month} {modDate.date}, {modDate.year},{' '}
                    {modDate.hours}:{modDate.mins}
                  </span>
                </div>

                <p className='main'>{comment}</p>
              </div>
            </>
          )}

          <div className='btns_wrapper'>
            {isDelete || (
              <>
                <button
                  className={`like_btn ${isLiking ? 'disable' : ''}`}
                  title='Like'
                  disabled={isLiking}
                  onClick={handleCommentLike}
                  style={!isUserLoggedIn ? { pointerEvents: 'none' } : {}}
                >
                  {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                  <span>{likes.length}</span>
                </button>

                {isUserLoggedIn && (
                  <>
                    <button
                      className='reply_btn'
                      title='Reply'
                      onClick={() => {
                        setShowReply(!showReply);
                        setShowNest(true);
                      }}
                    >
                      <BiComment />
                    </button>
                  </>
                )}

                {userInfo?.uid === uid && (
                  <>
                    <button
                      className='edit_btn'
                      title='Edit'
                      onClick={handleSetEditComment}
                    >
                      <MdOutlineModeEdit />
                    </button>

                    <button
                      className={`del_btn ${isDeleting ? 'disable' : ''}`}
                      title='Delete'
                      disabled={isDeleting}
                      onClick={handleDeleteComment}
                    >
                      <MdDeleteOutline />
                    </button>
                  </>
                )}
              </>
            )}

            {childReplies?.length ? (
              <button
                className='nest_btn'
                title={showNest ? 'Hide replies' : 'Show replies'}
                onClick={() => setShowNest(!showNest)}
              >
                {showNest ? <FaAngleUp /> : <FaAngleDown />}
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      {showReply && (
        <CommentForm
          parentId={commentId}
          setShowReply={setShowReply}
          showReply={showReply}
          commentRef={replyRef}
          edit={edit}
          setEdit={setEdit}
        />
      )}

      {showNest && (
        <Comment
          comments={childReplies}
          getReplies={getReplies}
          commentsByParentId={commentsByParentId}
        />
      )}
    </article>
  );
};

const CommentForm: React.FC<CommentFormInt> = ({
  commentRef,
  parentId = null,
  setShowReply,
  showReply,
  edit,
  setEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(edit?.state ? edit.comment : '');
  const { userInfo } = useBlogSelector((state) => state.user);
  const blogServices = new BlogServices();
  const { postId } = useParams();

  useEffect(() => {
    if (showReply) commentRef?.current?.focus();
  }, []);

  const handleComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    parentId: null | string = null
  ) => {
    e.preventDefault();
    if (comment.trim()) {
      const commentId = edit?.state
        ? edit.commentId
        : new ShortUniqueId({ length: 7 }).rnd();
      const commentData: CommentDataInt | UpdateCommentDataInt = edit?.state
        ? { comment }
        : {
            createdAt: serverTimestamp(),
            likes: [],
            commentId,
            uid: userInfo!.uid,
            parentId,
            comment,
            isDelete: false,
          };

      try {
        setLoading(true);
        edit?.state
          ? await blogServices.updateComment(
              commentData,
              postId ?? '',
              edit?.commentId ?? ''
            )
          : await blogServices.addComment(
              commentData as CommentDataInt,
              postId ?? ''
            );
        setEdit && setEdit((prev) => ({ ...prev, state: false }));
        setComment('');
        setShowReply && setShowReply(false);
      } catch (error) {
        toast.error('Please try again', { toastId: 'commnet_failed' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className='comment_form'>
      <textarea
        name=''
        id=''
        placeholder={showReply ? 'Give reply' : 'Contribute to discussion'}
        ref={commentRef}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <div className='btns_wrapper'>
        <button
          type='submit'
          className={`spc_btn ${loading ? 'disable' : ''}`}
          onClick={(e) => handleComment(e, parentId)}
          disabled={loading}
        >
          {loading
            ? edit?.state
              ? 'Editing'
              : showReply
              ? 'Replying...'
              : 'Contributing'
            : edit?.state
            ? 'Edit'
            : showReply
            ? 'Reply'
            : 'Contribute'}
        </button>
        {showReply && (
          <button
            className={`cancel_btn ${loading ? 'disable' : ''}`}
            disabled={loading}
            onClick={() => {
              setShowReply && setShowReply(false);
              setEdit && setEdit((prev) => ({ ...prev, state: false }));
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default Post;
