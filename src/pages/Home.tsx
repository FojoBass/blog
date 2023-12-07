import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidenavPart from './components/SidenavPart';
import dummyImg from '../assets/Me cropped.jpg';
import { SkeletonLoad, SinglePost, DisplayPosts } from './components';
import { useGlobalContext } from '../context';
import { v4 } from 'uuid';
import { DummyPostsInt, PostInt } from '../types';
import { useBlogDispatch, useBlogSelector } from '../app/store';
import { userSlice } from '../features/userSlice';
import { toast } from 'react-toastify';

export interface HandleStickInt {
  (el: HTMLDivElement, stick: boolean, posValue?: number): void;
}

// TODO IMPLEMNET RESPONSE SCROLL FOR ASIDE

const Home = () => {
  const asideRef = useRef<HTMLDivElement>(null);
  const { homePosts } = useGlobalContext();
  const { isUserLoggedIn, isSignedUp } = useBlogSelector((state) => state.user);
  const { setIsSignedUp } = userSlice.actions;
  const [modHomePost, setModHomePost] = useState<PostInt[] | DummyPostsInt[]>(
    []
  );

  const dispatch = useBlogDispatch();

  useEffect(() => {
    let uniqueIds = new Set<string>();
    let modPosts: PostInt[] | DummyPostsInt[] = [];

    if (
      homePosts &&
      homePosts.length &&
      homePosts[homePosts.length - 1].isDummy
    )
      modPosts = homePosts;
    else {
      homePosts?.forEach((post) => {
        if (!uniqueIds.has(post.postId)) {
          modPosts.push(post as PostInt);
          uniqueIds.add(post.postId);
        }
      });
    }
    setModHomePost(modPosts);
  }, [homePosts]);

  useEffect(() => {
    if (isSignedUp) {
      toast.success('Signup successful', { toastId: 'signup_success' });
      dispatch(setIsSignedUp(false));
    }
  }, [isSignedUp]);

  return (
    <section id='home_sect' className='gen_sect'>
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

        {homePosts && <DisplayPosts posts={modHomePost} target={'home'} />}
      </div>
    </section>
  );
};

export default Home;
