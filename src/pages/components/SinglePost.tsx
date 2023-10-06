// todo Check profile to enable/disable bookmarks
// todo Functionality to ensure bookmark icons change based on bookmarked status
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorInfo from './AuthorInfo';
import { CiBookmarkPlus } from 'react-icons/ci';

export interface SinglePostProps {
  posterName: string;
  avi: string;
  title: string;
  detail: string;
  date: string;
  category: string;
  postImgUrl: string;
  id: string;
  followersCount: number;
  aboutPoster: string;
}

const SinglePost: React.FC<SinglePostProps> = ({
  posterName,
  avi,
  title,
  detail,
  date,
  category,
  postImgUrl,
  id,
  followersCount,
  aboutPoster,
}) => {
  const [isUser, setIsUser] = useState(false);
  return (
    <article className='single_post'>
      <div className='post_wrapper'>
        <div className='top'>
          <div className='top_child'>
            <Link className='img_wrapper' to='/p/dummyUser'>
              <img src={avi} alt='' />
            </Link>
            <Link to='/p/dummyUser' className='author_name'>
              {posterName}
            </Link>
            <AuthorInfo
              imgUrl={avi}
              name={posterName}
              about={aboutPoster}
              followersCount={followersCount}
            />
          </div>
        </div>

        <div className='mid'>
          <Link to='/p/dummyUser/dummyPost' className='title'>
            {title}
          </Link>
          <p className='detail'>{detail}</p>
        </div>

        <div className='bottom'>
          <div className='bottom_left'>
            <span className='created_at'>{date}</span>
            <Link className='category' to='/categories/dummy'>
              {category}
            </Link>
          </div>

          {isUser || (
            <div className='bottom_right'>
              <button className='bkmark_btn'>
                <CiBookmarkPlus />
              </button>
            </div>
          )}
        </div>
      </div>
      <Link to='/p/dummyUser/dummyPost' className='img_wrapper'>
        <img src={postImgUrl} alt='' />
      </Link>
    </article>
  );
};

export default SinglePost;
