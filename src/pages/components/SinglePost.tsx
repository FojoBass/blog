// todo Check profile to enable/disable bookmarks
// todo Functionality to ensure bookmark icons change based on bookmarked status
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorInfo from './AuthorInfo';
import { CiBookmarkPlus } from 'react-icons/ci';
import { FollowsInt } from '../../types';

export interface SinglePostProps {
  posterName: string;
  avi: string;
  title: string;
  detail: string;
  date: string;
  category: string[];
  postImgUrl: string;
  id: string;
  followersCount: FollowsInt[];
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
  const [modDate] = useState({
    day: date.split(' ')[2],
    month: date.split(' ')[1],
    year: date.split(' ')[3],
  });
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
          <Link to='/dummyUser/dummyPost' className='title'>
            {title}
          </Link>
          <p className='detail'>{detail}</p>
        </div>

        <div className='bottom'>
          <div className='bottom_left'>
            <span className='created_at'>
              {modDate.day} {modDate.month}, {modDate.year}
            </span>
            {category.map((categ, index) => (
              <Link className='category' to='/categories/dummy' key={index}>
                {categ}
              </Link>
            ))}
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
      <Link to='/dummyUser/dummyPost' className='img_wrapper'>
        <img src={postImgUrl} alt='' />
      </Link>
    </article>
  );
};

export default SinglePost;
