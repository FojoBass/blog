import React from 'react';

const SkeletonLoad: React.FC<{ keyz: string }> = ({ keyz }) => {
  return (
    <article key={keyz} className='single_post dummy_single_post'>
      <div className='post_wrapper'>
        <div className='top'>
          <div className='top_child'>
            <span className='img_wrapper skeleton_anim'></span>
            <span className='author_name skeleton_anim'></span>
          </div>
        </div>

        <div className='mid'>
          <span className='title skeleton_anim'></span>
          <p className='detail skeleton_anim'></p>
        </div>

        <div className='bottom'>
          <div className='bottom_left'>
            <span className='created_at skeleton_anim'></span>
            <span className='category skeleton_anim'></span>
          </div>

          <div className='bottom_right'>
            <span className='bkmark_btn skeleton_anim'></span>
          </div>
        </div>
      </div>
      <span className='img_wrapper skeleton_anim'></span>
    </article>
  );
};

export default SkeletonLoad;
