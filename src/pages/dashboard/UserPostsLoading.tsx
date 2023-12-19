import React from 'react';
import { v4 } from 'uuid';

const UserPostsLoading = () => {
  return (
    <article className='user_post dummy' key={v4()}>
      <div className='left_sect'>
        <h3 className='post_title skeleton_anim2'></h3>
      </div>
      <div className='right_sect'>
        <div className='icons_info_wrapper skeleton_anim2'></div>

        <div className='btns_wrapper'>
          <span className='post_btn skeleton_anim2'></span>

          <span className='post_btn skeleton_anim2'></span>
        </div>
      </div>
    </article>
  );
};

export default UserPostsLoading;
