import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';

const dummyUserPosts = [
  {
    title: 'Title',
    publishedDate: 'May 12',
    likes: 5,
    comments: 4,
    viewed: 8,
    id: 'asdfg7',
    userName: 'dummyUser',
  },
  {
    title: 'Title 2',
    publishedDate: '',
    likes: 5,
    comments: 4,
    viewed: 8,
    id: 'asdfg6',
    userName: 'dummyUser',
  },
  {
    title: 'Title 3',
    publishedDate: 'Feb 17',
    likes: 5,
    comments: 4,
    viewed: 8,
    id: 'asdfg5',
    userName: 'dummyUser',
  },
];

const UserPosts = () => {
  return (
    <section className='user_posts'>
      {dummyUserPosts.map((post) => (
        <article className='user_post' key={post.id}>
          <div className='left_sect'>
            <Link to={`/${post.userName}/${post.id}`} className='post_title'>
              {post.title}
            </Link>
            {post.publishedDate && (
              <p className='pub_details'>
                <span>Published: </span>
                {post.publishedDate}
              </p>
            )}
          </div>
          <div className='right_sect'>
            {post.publishedDate ? (
              <div className='icons_info_wrapper'>
                <article className='icon_info'>
                  <span className='icon_wrapper'>
                    <AiOutlineHeart />{' '}
                  </span>
                  {post.likes}
                </article>

                <article className='icon_info'>
                  <span className='icon_wrapper'>
                    <BiComment />{' '}
                  </span>
                  {post.comments}
                </article>

                <article className='icon_info'>
                  <span className='icon_wrapper'>
                    <AiOutlineEye />{' '}
                  </span>
                  {post.viewed}
                </article>
              </div>
            ) : (
              <p className='pub_draft'>Draft</p>
            )}

            <div className='btns_wrapper'>
              {!post.publishedDate ? (
                <button className='post_btn del_btn'>Delete</button>
              ) : (
                <button className='post_btn'>Manage</button>
              )}
              <button className='post_btn'>Edit</button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default UserPosts;
