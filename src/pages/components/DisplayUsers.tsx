import React from 'react';
import { Link } from 'react-router-dom';
import { FollowsInt } from '../../types';

interface PropInt {
  users: FollowsInt[];
}

const DisplayUsers: React.FC<PropInt> = ({ users }) => {
  return (
    <section className='follows_sect'>
      {users.map((user) => (
        <article className='card_wrapper' key={user.id}>
          <Link to='/p/dummyUser' className='img_wrapper'>
            <img src={user.avi} alt='' />
          </Link>
          <Link to='/p/dummyUser' className='user_name'>
            {user.userName}
          </Link>
        </article>
      ))}
    </section>
  );
};

export default DisplayUsers;
