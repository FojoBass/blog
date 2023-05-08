// todo IMPLEMENTS CHANGES WHEN AUTH IS UP, WHERE NEEDED
import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import {
  BsBookmarkDashFill,
  BsThreeDots,
  BsBookmarkPlus,
  BsDot,
} from 'react-icons/bs';
import mainImg from '../assets/warplane.jpg';
import subImg1 from '../assets/cockpit.jpg';
import subImg2 from '../assets/salute.jpg';
import avatar from '../assets/Me cropped.jpg';
import { Link } from 'react-router-dom';

interface CommentInt {
  id: string;
  replies: CommentInt[] | [];
  reply: string;
  likes: number;
  isFirstLevel?: boolean;
}

const Post = () => {
  // todo comments will contain info about the replier
  const comments: CommentInt[] = [
    {
      id: 'asdf',
      replies: [
        {
          id: 'dfgh',
          replies: [
            {
              id: 'ghker',
              replies: [],
              reply: 'perfect shit here bruf',
              likes: 3,
            },
            {
              id: 'gnvk',
              replies: [],
              reply: 'Came down to it blud',
              likes: 2,
            },
          ],
          reply: 'Just some rand shit',
          likes: 6,
        },
        {
          id: 'ery',
          replies: [
            {
              id: 'hdfk',
              replies: [],
              reply: 'Messi the Goat 🐐',
              likes: 2,
            },
          ],
          reply: 'Yeah Randies Bruf',
          likes: 4,
        },
        {
          id: 'wecn',
          replies: [],
          reply: "123 that's all",
          likes: 1,
        },
      ],
      reply: 'I am the first',
      likes: 8,
      isFirstLevel: true,
    },
    {
      id: 'nms',
      replies: [],
      reply: "Dude, I am 2nd nd I've got no reply!",
      likes: 0,
      isFirstLevel: true,
    },
  ];
  return (
    <section id='single_post_sect'>
      <div className='center_sect'>
        <aside className='left_side'>
          <Interactions type='like' count={5} />
          <Interactions type='comment' count={3} />
          <Interactions type='bookmark' count={2} />
          <button className='share_opts_btn'>
            <BsThreeDots />
          </button>
        </aside>

        <main className='mid_side'>
          <div className='top_super_wrapper'>
            <header className='mid_side_head'>
              <div className='img_wrapper main_img'>
                <img src={mainImg} alt='' />
              </div>

              <div className='poster'>
                <Link to='/p/dummyUser' className='img_wrapper poster_avi'>
                  <img src={avatar} alt='' />
                </Link>
                <div className='info'>
                  <Link to='/p/dummyUser'>Dummy name</Link>
                  <p>Posted on Feb 17</p>
                </div>
              </div>

              <h1 className='main_heading'>
                Lorem ipsum dolor sit amet consectetur
              </h1>
              <Link className='category' to='/categories/dummy'>
                Category
              </Link>
            </header>

            <div className='main_post_wrapper'>
              <p>
                Lorem <em>ipsum</em> dolor sit amet consectetur adipisicing
                elit. Doloremque quam ab, amet at, blanditiis ex repellat
                consequuntur, eos molestias harum cupiditate! Neque ad excepturi
                tenetur ab molestiae magnam eos omnis repellendus, consequatur
                quibusdam aperiam facere possimus dolore quia labore officia
                culpa deleniti nulla dolorum ea provident? Vitae officiis
                deserunt adipisci!
              </p>

              <h2>
                Lorem <em>ipsum</em> dolor sit amet consectetur adipisicing.
              </h2>
              <p>
                Lorem <em>ipsum</em> dolor sit amet consectetur adipisicing
                elit. Architecto, laboriosam.
              </p>
              <div className='img_wrapper'>
                <img src={subImg1} alt='' />
              </div>
              <p>
                Lorem <em>ipsum</em> dolor sit amet, consectetur adipisicing.
              </p>
              <ul>
                <li>
                  Lorem <em>ipsum</em> dolor sit amet consectetur adipisicing
                  elit. Porro, voluptatum.
                </li>
                <li>
                  Lorem <em>ipsum</em> dolor sit amet consectetur adipisicing
                  elit. Porro, voluptatum.
                </li>
                <li>
                  Lorem <em>ipsum</em> dolor sit amet consectetur adipisicing
                  elit. Porro, voluptatum.
                </li>
              </ul>
              <p>
                Lorem <em>ipsum</em> dolor sit amet consectetur adipisicing
                elit. Nisi, amet <strong>distinctio</strong> suscipit sequi
                similique neque tenetur officia impedit, quidem, temporibus
                laborum atque maxime accusamus recusandae. Ea, harum neque
                doloremque inventore{' '}
                <a href='#' target='_blank'>
                  voluptatem veritatis tempore velit adipisci.
                </a>
              </p>
              <div className='img_wrapper'>
                <img src={subImg2} alt='' />
              </div>

              <h2>
                Lorem <em>ipsum</em> dolor sit amet consectetur.
              </h2>
              <p>
                Lorem <em>ipsum</em> dolor sit amet consectetur adipisicing
                elit. Quos aut maiores numquam cumque dolores fugiat!
              </p>
              <ol>
                <li>
                  Lorem <em>ipsum</em> dolor sit amet consectetur, adipisicing
                  elit.
                </li>
                <li>
                  Cum cupiditate enim consectetur itaque quae nisi nostrum?
                  Eligendi ratione assumenda modi!
                </li>
              </ol>
            </div>
            {
              //todo BUILD COMMENT SECTION AFTER STYLINGS
            }
            <div className='comments_super_wrapper'>
              <h3>Comments (5)</h3>
              <div className='make_comment_wrapper'>
                <div className='img_wrapper'>
                  <img src={avatar} alt='' />
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
                <Comment comments={comments} />
              </div>
            </div>
            {
              //todo BUILD COMMENT SECTION AFTER STYLINGS
            }
          </div>

          <div className='read_next_sect'>
            <h2>Read next</h2>
            <Link to='/dummyUser/dummyPost' className='read_post'>
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

            <Link to='/dummyUser/dummyPost' className='read_post'>
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

            <Link to='/dummyUser/dummyPost' className='read_post'>
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

            <Link to='/dummyUser/dummyPost' className='read_post'>
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
              {
                //todo There will be more opts here when auth is set up
              }
              <Link to='/p/dummyUser' className='top'>
                <div className='img_wrapper'>
                  <img src={avatar} alt='' />
                </div>
                <p className='author'>Dummy name</p>
              </Link>

              <div className='mid'>
                <button className='follow_btn spc_btn'>Follow</button>
                <p className='author_about'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusantium, voluptatibus.
                </p>
              </div>

              <div className='opts'>
                <article className='opt'>
                  <h3>Joined</h3>
                  <p>Sep 16, 1878</p>
                </article>

                <article className='opt'>
                  <h3>Work</h3>
                  <p>Somewhere in Earth</p>
                </article>
              </div>
            </div>

            <div className='author_posts'>
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
          </div>

          <footer className='fixed_bottom'>
            <Interactions type='like' count={5} />
            <Interactions type='comment' count={3} />
            <Interactions type='bookmark' count={2} />
            <button className='share_opts_btn'>
              <BsThreeDots />
            </button>
          </footer>
        </main>

        <aside className='right_side'>
          <div className='about_poster'>
            {
              //todo There will be more opts here when auth is set up
            }
            <Link to='/p/dummyUser' className='top'>
              <div className='img_wrapper'>
                <img src={avatar} alt='' />
              </div>
              <p className='author'>Dummy name</p>
            </Link>

            <div className='mid'>
              <button className='follow_btn spc_btn'>Follow</button>
              <p className='author_about'>
                Lorem, ipsum dolor sit amet consectetur adipisicing. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Accusantium,
                voluptatibus.
              </p>
            </div>

            <div className='opts'>
              <article className='opt'>
                <h3>Joined</h3>
                <p>Sep 16, 1878</p>
              </article>

              <article className='opt'>
                <h3>Work</h3>
                <p>Somewhere in Earth</p>
              </article>
            </div>
          </div>

          <div className='author_posts'>
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

const Comment: React.FC<CommentPropInt> = ({ comments }) => {
  return (
    <>
      {comments.map(({ id, reply, replies, likes, isFirstLevel }) => {
        return (
          <article
            className='super_comment_wrapper'
            key={id}
            style={isFirstLevel ? { marginLeft: '10px' } : {}}
          >
            <div className='comment_wrapper'>
              <Link to='/p/dummyUser' className='img_wrapper'>
                <img src={avatar} alt='' />
              </Link>

              <div className='wrapper'>
                <div className='main_comment'>
                  <div className='top'>
                    <Link to='/p/dummyUser'>Dummy User</Link>{' '}
                    <span className='dot_seperator'>
                      <BsDot />
                    </span>{' '}
                    <span className='created_at'>Feb 28</span>
                  </div>

                  <p className='main'>{reply}</p>
                </div>

                <div className='btns_wrapper'>
                  <button className='like_btn'>
                    <AiOutlineHeart />
                    <span>{likes}</span>
                  </button>

                  <button className='reply_btn'>
                    <BiComment />
                  </button>
                </div>
              </div>
            </div>

            <Comment comments={replies} />
          </article>
        );
      })}
    </>
  );
};

export default Post;
