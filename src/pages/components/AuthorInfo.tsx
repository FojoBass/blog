import React from 'react';
import { Link } from 'react-router-dom';
import { FollowsInt } from '../../types';

export interface AuthorInfoType {
  imgUrl: string;
  name: string;
  about: string;
  followersCount: FollowsInt[];
  uid: string;
}

const AuthorInfo: React.FC<AuthorInfoType> = ({
  imgUrl,
  name,
  about,
  followersCount,
  uid,
}) => {
  return (
    <div className='author_info_wrapper'>
      <div className='author_info_top'>
        <Link to={`/p/${uid}`} className='heading'>
          <div className='img_wrapper'>
            <img src={imgUrl} alt='' />
          </div>

          <h3 className='name'>{name}</h3>
        </Link>

        <p className='info'>{about}</p>
      </div>

      <div className='author_info_bottom'>
        <span className='left_side'>{followersCount.length} Followers </span>

        <button className='right_side follow_btn'>Follow</button>
      </div>
    </div>
  );
};

export default AuthorInfo;
