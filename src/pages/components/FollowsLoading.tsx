import React from 'react';
import { DummyPostsInt } from '../../types';

interface FollowLoadInt {
  user: DummyPostsInt;
}

const FollowsLoading: React.FC<FollowLoadInt> = ({ user }) => {
  return (
    <article className='card_wrapper dummy' key={user.postId}>
      <span className='img_wrapper '></span>
      <span className='user_name '></span>
    </article>
  );
};

export default FollowsLoading;
