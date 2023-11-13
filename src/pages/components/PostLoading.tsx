import React from 'react';

const PostLoading = () => {
  return (
    <div className='center_sect dummy'>
      <aside className='left_side'>
        <span className={`icon_wrapper skeleton_anim3`}></span>
        <span className={`icon_wrapper skeleton_anim3`}></span>
        <span className={`icon_wrapper skeleton_anim3`}></span>
      </aside>

      <main className='mid_side'>
        <div className='top_super_wrapper'>
          <header className='mid_side_head'>
            <div className='img-wrapper main_img skeleton_anim3'></div>

            <div className='poster'>
              <span className='img_wrapper poster_avi skeleton_anim3'></span>
              <div className='info'>
                <span className='skeleton_anim'></span>
                <p className='skeleton_anim'></p>
              </div>
            </div>

            <h1 className='main_heading'>
              <p className='skeleton_anim'></p>
              <p className='skeleton_anim'></p>
            </h1>
          </header>

          <div className='main_post_wrapper skeleton_anim3'></div>
        </div>

        <footer className='fixed_bottom'>
          <span className={`icon_wrapper skeleton_anim3`}></span>
          <span className={`icon_wrapper skeleton_anim3`}></span>
          <span className={`icon_wrapper skeleton_anim3`}></span>
        </footer>
      </main>

      <aside className='right_side'>
        <div className='about_poster'>
          <div className='top'>
            <div className='img_wrapper skeleton_anim'></div>
            <p className='author skeleton_anim'></p>
          </div>

          <div className='mid'>
            <button className='follow_btn skeleton_anim'></button>
            <p className='author_about'>
              <span className='skeleton_anim'></span>
              <span className='skeleton_anim'></span>
              <span className='skeleton_anim'></span>
              <span className='skeleton_anim'></span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PostLoading;
