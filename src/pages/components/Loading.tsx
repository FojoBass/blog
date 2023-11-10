import React from 'react';

const Loading = () => {
  return (
    <>
      <div className='dummy_profile'>
        <div
          className='head_overlay'
          style={{
            backgroundColor: '#000',
          }}
        ></div>

        <div className='center_sect profile_wrapper'>
          <header className='profile_header'>
            <div className='top'>
              <div className='img_wrapper skeleton_anim'></div>

              <div className='right_side'>
                <span
                  className='dum_btn skeleton_anim'
                  style={{ width: '50px' }}
                ></span>
              </div>
            </div>

            <div className='mid'>
              <div className='user_info'>
                <h3 className='user_name'>
                  <span className='skeleton_anim'></span>
                </h3>
                <div className='about_user'>
                  <p className='skeleton_anim'></p>
                  <p className='skeleton_anim'></p>
                  <p className='skeleton_anim'></p>
                </div>
              </div>

              <div className='more_info'>
                <article className='dum_info_opt skeleton_anim'></article>

                <article className='dum_info_opt skeleton_anim'></article>
              </div>
            </div>

            <div className='bottom'>
              <article className='dum_info_opt skeleton_anim'></article>

              <article className='dum_info_opt skeleton_anim'></article>

              <article className='dum_info_opt skeleton_anim'></article>
            </div>
          </header>

          <div className='user_posts'>
            <aside>
              <div className='side_opts skeleton_anim2'></div>
            </aside>

            <div className='skeleton_anim2 main'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
