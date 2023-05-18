import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidenavPart from './components/SidenavPart';
import dummyImg from '../assets/Me cropped.jpg';
import { SkeletonLoad, SinglePost, DisplayPosts } from './components';
import { useGlobalContext } from '../context';

export interface HandleStickInt {
  (el: HTMLDivElement, stick: boolean, posValue?: number): void;
}

export interface PostsInt {
  isDummy: boolean;
}

// TODO IMPLEMNET RESPONSE SCROLL FOR ASIDE

const Home = () => {
  const asideRef = useRef<HTMLDivElement>(null);
  const { isUserLogged } = useGlobalContext();
  // TODO Placeholder for loading purposes
  const homePosts: PostsInt[] = [
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
  ];

  return (
    <section id='home_sect'>
      <div className='center_sect home_wrapper'>
        <aside className='left_side' ref={asideRef}>
          {!isUserLogged ? (
            <div className='not_logged_sect'>
              <h3>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                cum?
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                aspernatur sint quae labore, quis voluptas.
              </p>

              <div className='btns_wrapper'>
                <Link to='/join' className='create_acct_btn'>
                  Create account
                </Link>
                <Link to='/enter' className='login_btn'>
                  Log in
                </Link>
              </div>
            </div>
          ) : (
            ''
          )}

          <SidenavPart />
        </aside>

        <DisplayPosts posts={homePosts} />
      </div>
    </section>
  );
};

export default Home;
