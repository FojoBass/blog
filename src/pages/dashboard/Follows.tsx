import React from 'react';
import { FollowsInt } from '../../App';
import { Link } from 'react-router-dom';

interface PropInt {
  items: FollowsInt[];
}

const Follows: React.FC<PropInt> = ({ items }) => {
  return (
    <section className='follows_sect'>
      {items.map((item) => (
        <article className='card_wrapper' key={item.id}>
          <Link to='/p/dummyUser' className='img_wrapper'>
            <img src={item.avi} alt='' />
          </Link>
          <Link to='/p/dummyUser' className='user_name'>
            {item.userName}
          </Link>
        </article>
      ))}
    </section>
  );
};

export default Follows;
