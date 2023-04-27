import React from 'react';
import { Link } from 'react-router-dom';

export interface AuthorInfoType {
  imgUrl: string;
  name: string;
  about: string;
  followersCount: number;
}

const AuthorInfo: React.FC<AuthorInfoType> = ({
  imgUrl,
  name,
  about,
  followersCount,
}) => {
  return (
    <div className='author_info_wrapper'>
      <div className='author_info_top'>
        <Link to='/p/dummyUser' className='heading'>
          <div className='img_wrapper'>
            <img src={imgUrl} alt='' />
          </div>

          <h3 className='name'>{name}</h3>
        </Link>

        <p className='info'>{about}</p>
      </div>

      <div className='author_info_bottom'>
        <span className='left_side'>{followersCount} Followers </span>

        <button className='right_side follow_btn'>Follow</button>
      </div>
    </div>
  );
};

export default AuthorInfo;
