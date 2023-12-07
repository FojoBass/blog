import React from 'react';
import { Link } from 'react-router-dom';
import { DummyPostsInt, SearchFollowsInt } from '../../types';
import FollowsLoading from './FollowsLoading';

interface PropInt {
  users: SearchFollowsInt[] | DummyPostsInt[];
  type: 'search' | 'followers' | 'followings';
}

const DisplayUsers: React.FC<PropInt> = ({ users, type }) => {
  return !users.length ? (
    <h3 className='empty_data'>
      No{' '}
      {type === 'search'
        ? 'user found'
        : type === 'followers'
        ? 'followers'
        : 'followings'}
    </h3>
  ) : (
    <section className='follows_sect'>
      {users.map((user) =>
        user.isDummy ? (
          <FollowsLoading key={user.postId} user={user} />
        ) : (
          <article className='card_wrapper' key={(user as SearchFollowsInt).id}>
            <Link to='/p/dummyUser' className='img_wrapper'>
              <img src={(user as SearchFollowsInt).avi} alt='' />
            </Link>
            <Link to='/p/dummyUser' className='user_name'>
              {(user as SearchFollowsInt).userName}
            </Link>
          </article>
        )
      )}
    </section>
  );
};

export default DisplayUsers;
