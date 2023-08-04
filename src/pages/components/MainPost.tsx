import React from 'react';
import { PostInfoType } from '../../types';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

interface MainPostType {
  postInfo: PostInfoType;
}

const MainPost: React.FC<MainPostType> = ({
  postInfo: {
    bannerImgUrl,
    title,
    createdAt,
    userName,
    userAvi,
    category,
    post,
  },
}) => {
  return (
    <>
      <header className='mid_side_head'>
        {bannerImgUrl && (
          <div className='img_wrapper main_img'>
            <img src={bannerImgUrl} alt='' />
          </div>
        )}

        <div className='poster'>
          <Link to='/p/dummyUser' className='img_wrapper poster_avi'>
            <img src={userAvi} alt='' />
          </Link>
          {userName && (
            <div className='info'>
              <Link to='/p/dummyUser'>{userName}</Link>
              <p>Posted on {createdAt}</p>
            </div>
          )}
        </div>

        <h1 className='main_heading'>{title}</h1>
        {category && (
          <Link className='category' to='/categories/dummy'>
            {category}
          </Link>
        )}
      </header>

      <div
        className='main_post_wrapper'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post),
        }}
      ></div>
    </>
  );
};

export default MainPost;
