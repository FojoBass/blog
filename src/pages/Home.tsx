import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidenavPart from './components/SidenavPart';
import dummyImg from '../assets/Me cropped.jpg';
import { SkeletonLoad, SinglePost, DisplayPosts } from './components';
import { useGlobalContext } from '../context';
import { v4 } from 'uuid';
import { DummyPostsInt } from '../types';
import { useBlogSelector } from '../app/store';

export interface HandleStickInt {
  (el: HTMLDivElement, stick: boolean, posValue?: number): void;
}

// TODO IMPLEMNET RESPONSE SCROLL FOR ASIDE

const Home = () => {
  const asideRef = useRef<HTMLDivElement>(null);
  const { setSearchString } = useGlobalContext();
  const { isUserLoggedIn } = useBlogSelector((state) => state.user);
  // TODO Placeholder for loading purposes
  const homePosts: DummyPostsInt[] = [
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
  ];

  useEffect(() => {
    if (setSearchString) setSearchString('');
  }, []);

  return (
    <section id='home_sect'>
      <div className='center_sect home_wrapper'>
        <aside className='left_side' ref={asideRef}>
          {!isUserLoggedIn ? (
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
