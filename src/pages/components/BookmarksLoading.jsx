import React from 'react';
import { v4 } from 'uuid';

const BookmarksLoading = () => {
  return (
    <article className='card_wrapper dummy skeleton_anim' key={v4()}>
      <span className='img_wrapper skeleton_anim2'></span>

      <div className='post_side'>
        <span className='title skeleton_anim2'></span>

        <div className='bottom'>
          <span className='author skeleton_anim2'></span>
          <span className='date_wrapper skeleton_anim2'></span>
        </div>
      </div>
    </article>
  );
};

export default BookmarksLoading;
