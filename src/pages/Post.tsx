import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import {
  BsBookmarkDashFill,
  BsThreeDots,
  BsBookmarkPlus,
  BsDot,
} from 'react-icons/bs';
import subImg1 from '../assets/cockpit.jpg';
import subImg2 from '../assets/salute.jpg';
import avatar from '../assets/Me cropped.jpg';
import { Link, useParams } from 'react-router-dom';
import { CommentInt, PostInt } from '../types';
import { useGlobalContext } from '../context';
import PostLoading from './components/PostLoading';
import { MdOutlineError } from 'react-icons/md';
import { BlogServices } from '../services/firebase/blogServices';
import { useBlogSelector } from '../app/store';
import { handleParsePost } from '../helpers/handleParsePost';
import DOMPurify from 'dompurify';

const Post = () => {
  const { uid: authorId, postId } = useParams();
  const { displayPostContent, setDisplayPostContent, homePosts, userPosts } =
    useGlobalContext();
  const [fetchingPost, setFetchingPost] = useState(true);
  const blogServices = new BlogServices();
  const [modDate, setModDate] = useState({ day: '', month: '', year: '' });
  const { userInfo } = useBlogSelector((state) => state.user);
  const [mainPost, setMainPost] = useState('');

  useEffect(() => {
    // TODO Use onSnapshot so you can get realtime updates
    // TODO For bookmarks, get a global variable that stores all newly added ones, so that it can be maintained across home signle posts and post page
    // TODO Fit in every variable where needed
    // TODO YOU'VE GOT THIS FUTURE ME 😊😊😊

    if (authorId && postId) {
      if (homePosts && homePosts.find((post) => post.postId === postId)) {
        const targetPost = homePosts.find(
          (post) => post.postId === postId
        ) as PostInt;
        setDisplayPostContent && setDisplayPostContent(targetPost);
        setFetchingPost(false);
      } else if (
        userPosts &&
        userPosts.find((post) => post.postId === postId)
      ) {
        const targetPost = userPosts.find(
          (post) => post.postId === postId
        ) as PostInt;
        setDisplayPostContent && setDisplayPostContent(targetPost);
        setFetchingPost(false);
      } else
        (async () => {
          let content: any;
          try {
            let res = await blogServices.getPost(authorId, postId, true);
            if (!res.data())
              res = await blogServices.getPost(authorId, postId, false);
            content = res.data();
            setDisplayPostContent &&
              setDisplayPostContent({
                ...(content as PostInt),
                createdAt: content.createdAt.toDate().toString(),
                publishedAt: content.publishedAt.toDate().toString(),
              });
          } catch (error) {
            console.log('Post fetching faile: ', error);
          } finally {
            setFetchingPost(false);
          }
        })();
    }
  }, [homePosts, userPosts]);

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
            <Interactions type='like' count={displayPostContent.likes.length} />
            <Interactions
              type='comment'
              count={displayPostContent.commentsCount}
            />
            <Interactions
              type='bookmark'
              count={displayPostContent.bookmarks.length}
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
                  <Link to='/p/dummyUser' className='img_wrapper poster_avi'>
                    <img src={displayPostContent.aviUrl} alt='author avi' />
                  </Link>
                  <div className='info'>
                    <Link to='/p/dummyUser'>{displayPostContent.author}</Link>
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
                    ></textarea>
                    <button type='submit' className='spc_btn'>
                      Contribute
                    </button>
                  </form>
                </div>

                <div className='comments_wrapper'>
                  {/* <Comment comments={comments} /> */}
                </div>
              </div>
            </div>

            <div className='read_next_sect'>
              <h2>Read next</h2>
              <Link to='/p/dummyUser/dummyPost' className='read_post'>
                <div className='img_wrapper'>
                  <img src={avatar} alt='' />
                </div>
                <div className='post_info'>
                  <h3 className='title'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <p className='more_info'>Lorem Dolor - Feb 17</p>
                </div>
              </Link>

              <Link to='/p/dummyUser/dummyPost' className='read_post'>
                <div className='img_wrapper'>
                  <img src={avatar} alt='' />
                </div>
                <div className='post_info'>
                  <h3 className='title'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <p className='more_info'>Lorem Dolor - Feb 17</p>
                </div>
              </Link>

              <Link to='/p/dummyUser/dummyPost' className='read_post'>
                <div className='img_wrapper'>
                  <img src={avatar} alt='' />
                </div>
                <div className='post_info'>
                  <h3 className='title'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <p className='more_info'>Lorem Dolor - Feb 17</p>
                </div>
              </Link>

              <Link to='/p/dummyUser/dummyPost' className='read_post'>
                <div className='img_wrapper'>
                  <img src={avatar} alt='' />
                </div>
                <div className='post_info'>
                  <h3 className='title'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                  <p className='more_info'>Lorem Dolor - Feb 17</p>
                </div>
              </Link>
            </div>

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
                  <button className='follow_btn spc_btn'>Follow</button>
                  <p className='author_about'>{displayPostContent.bio}</p>
                </div>
              </div>

              <div className='author_posts'>
                <h3>
                  More from{' '}
                  <Link to={`/p/${displayPostContent.uid}`}>
                    {displayPostContent.author}
                  </Link>
                </h3>

                {/* TODO WORK HERE ALSO */}
                <Link to='/dummyName/dummyPost' className='post'>
                  <span className='post_title'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sit mollitia dolores dolorem?
                  </span>
                  <span className='post_category'>category</span>
                </Link>

                <Link to='/dummyName/dummyPost' className='post'>
                  <span className='post_title'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sit mollitia dolores dolorem?
                  </span>
                  <span className='post_category'>category</span>
                </Link>
              </div>
            </div>

            <footer className='fixed_bottom'>
              <Interactions
                type='like'
                count={displayPostContent.likes.length}
              />
              <Interactions
                type='comment'
                count={displayPostContent.commentsCount}
              />
              <Interactions
                type='bookmark'
                count={displayPostContent.bookmarks.length}
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
                {/* TODO AND MORE WORK */}
                <button className='follow_btn spc_btn'>Follow</button>
                <p className='author_about'>{displayPostContent.bio}</p>
              </div>
            </div>

            <div className='author_posts'>
              {/* TODO STILL MORE WORK */}
              <h3>
                More from <Link to='/p/dummyUser'>{'dummyAuthor'}</Link>
              </h3>

              <Link to='/dummyName/dummyPost' className='post'>
                <span className='post_title'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                  mollitia dolores dolorem?
                </span>
                <span className='post_category'>category</span>
              </Link>

              <Link to='/dummyName/dummyPost' className='post'>
                <span className='post_title'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                  mollitia dolores dolorem?
                </span>
                <span className='post_category'>category</span>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export interface InteractionsInt {
  type: string;
  count: number;
}

interface CommentPropInt {
  comments: CommentInt[];
}

const Interactions: React.FC<InteractionsInt> = ({ type, count }) => {
  // todo Fix in all the click events

  return (
    <button
      className={`icon_wrapper 
      ${
        type === 'like'
          ? type
          : type === 'comment'
          ? type
          : type === 'bookmark'
          ? type
          : ''
      }
      `}
    >
      {type === 'like' ? (
        <AiOutlineHeart />
      ) : type === 'comment' ? (
        <BiComment />
      ) : type === 'bookmark' ? (
        <BsBookmarkPlus />
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
