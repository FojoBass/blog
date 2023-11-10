import React, { useState, useEffect, useRef } from 'react';
import avi from '../assets/Me cropped.jpg';
import { BsThreeDots, BsBoxArrowUpRight, BsPersonHearts } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { MdCake, MdMail } from 'react-icons/md';
import { FaScroll } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillBehanceSquare,
} from 'react-icons/ai';
import { DisplayPosts, Loading } from './components';
import { DummyPostsInt, PostInt, UserInfoInt } from '../types';
import { v4 } from 'uuid';
import { useBlogSelector } from '../app/store';
import { useGlobalContext } from '../context';
import { Link, useParams } from 'react-router-dom';
import { userSlice } from '../features/userSlice';
import { BlogServices } from '../services/firebase/blogServices';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebase/config';

const Profile = () => {
  const { isUserLoggedIn, userInfo } = useBlogSelector((state) => state.user);
  const theme = useBlogSelector((state) => state.theme);
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [displayInfo, setDisplayInfo] = useState<UserInfoInt | null>(null);
  const {
    userPosts,
    setUserPosts,
    targetUserId,
    setTargetUserId,
    setUserLastDocTime,
    setUserPostsLoading,
    authLoading,
  } = useGlobalContext();
  const blogServices = new BlogServices();
  const delayListener = useRef(true);
  const [modUserPosts, setModUserPosts] = useState<PostInt[] | DummyPostsInt[]>(
    []
  );

  const { uid } = useParams();

  useEffect(() => {
    if (typeof authLoading === 'boolean' && !authLoading) {
      if (uid === userInfo?.uid) {
        console.log('IF');

        setUserInfoLoading(false);
        setDisplayInfo(userInfo);
      } else {
        console.log('ELSE');
        // TODO FETCH USER INF
        let fetchUserInfo: any = null;
        (async () => {
          try {
            const res = await blogServices.getUserInfo(uid ?? '');
            fetchUserInfo = res.data();

            if (!fetchUserInfo) {
              throw new Error();
              // TODO THIS SHIT IS NOT WORKING
              // TODO HANDLE ERROR YOUR OWN WAY
              // TODO SET THE USER INFO AND PROCEED TO OTHER THINGS
            }

            setDisplayInfo({
              ...fetchUserInfo,
              createdAt: fetchUserInfo.createdAt.toDate().toString(),
            });
          } catch (error) {
            console.log('User info fetch failed: ', error);
          } finally {
            setUserInfoLoading(false);
          }
        })();
      }
      setTargetUserId && setTargetUserId(uid ?? '');
    }
  }, [uid, userInfo, authLoading]);

  useEffect(() => {
    if (!userInfoLoading && uid === userInfo?.uid && targetUserId) {
      // *Fethces initial first batch of posts
      (async () => {
        try {
          const res = await blogServices.getUserPosts(
            false,
            null,
            targetUserId,
            true
          );
          let posts: any[] = [];

          res.forEach((doc) => {
            const post = doc.data();
            posts.push({
              ...post,
              publishedAt: post.publishedAt
                ? post.publishedAt.toDate().toString()
                : '',
              createdAt: post.createdAt
                ? post.createdAt.toDate().toString()
                : '',
            });
          });

          const lastDocTime = res.docs[res.docs.length - 1].data().createdAt;
          setUserLastDocTime && setUserLastDocTime(lastDocTime);

          setUserPosts && setUserPosts(posts);
        } catch (err) {
          console.log(`User post initial fetch failed: ${err} `);
        } finally {
          setUserPostsLoading && setUserPostsLoading(false);
          delayListener.current = false;
        }
      })();
    }
  }, [userInfoLoading, targetUserId]);

  useEffect(() => {
    console.log('User Posts: ', userPosts);

    let uniqueIds = new Set<string>();
    let modPosts: PostInt[] | DummyPostsInt[] = [];

    if (
      userPosts &&
      userPosts.length &&
      userPosts[userPosts.length - 1].isDummy
    )
      modPosts = userPosts;
    else {
      userPosts?.forEach((post) => {
        if (!uniqueIds.has(post.postId)) {
          modPosts.push(post as PostInt);
          uniqueIds.add(post.postId);
        }
      });
    }
    setModUserPosts(modPosts);
  }, [userPosts]);

  return (
    <section id='profile_sect' className='gen_sect'>
      {userInfoLoading ? (
        <Loading />
      ) : (
        displayInfo && (
          <>
            <div
              className='head_overlay'
              style={{
                backgroundColor:
                  theme === 'light' ? displayInfo?.userColor : '#000',
              }}
            ></div>

            <div className='center_sect profile_wrapper'>
              <header className='profile_header'>
                <div className='top'>
                  <div
                    className='img_wrapper'
                    style={{
                      backgroundColor:
                        theme === 'light' ? displayInfo?.userColor : '#000',
                    }}
                  >
                    <img
                      src={`${displayInfo?.aviUrls.bigAviUrl}`}
                      alt='user avatar'
                    />
                  </div>

                  <div className='right_side'>
                    {isUserLoggedIn ? (
                      uid === userInfo?.uid ? (
                        <Link
                          to={`/settings/${userInfo?.userId}/profile`}
                          className='spc_btn edit_btn'
                        >
                          Edit Profile
                        </Link>
                      ) : (
                        <>
                          <button className='spc_btn follow_btn'>Follow</button>
                          <button className='more_opts'>
                            <BsThreeDots />
                          </button>
                        </>
                      )
                    ) : (
                      <>
                        <button className='spc_btn follow_btn'>Follow</button>
                        <button className='more_opts'>
                          <BsThreeDots />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className='mid'>
                  <div className='user_info'>
                    <h3 className='user_name'>{displayInfo?.userName}</h3>
                    <p className='about_user'>{displayInfo?.bio}</p>
                  </div>

                  <div className='more_info'>
                    <article className='more_info_opt'>
                      <div className='icon_wrapper'>
                        <ImLocation2 />
                      </div>
                      {displayInfo?.country.name}, {displayInfo?.state}
                    </article>

                    {userInfo?.dispEmail && (
                      <article className='more_info_opt'>
                        <a href='mailto: fojo4god@gmail.com'>
                          <div className='icon_wrapper'>
                            <MdMail />
                          </div>
                          {displayInfo?.email}
                        </a>
                      </article>
                    )}

                    {displayInfo?.socials.url && (
                      <article className='more_info_opt'>
                        <a href='https://fast.com' target='_blank'>
                          <div className='icon_wrapper'>
                            <BsBoxArrowUpRight />
                          </div>
                          {displayInfo?.socials.url}
                        </a>
                      </article>
                    )}

                    <article className='more_info_opt'>
                      <div className='icon_wrapper'>
                        <MdCake />
                      </div>
                      Joined on{' '}
                      {(displayInfo?.createdAt as string).split(' ')[1]}{' '}
                      {(displayInfo?.createdAt as string).split(' ')[2]},{' '}
                      {(displayInfo?.createdAt as string).split(' ')[3]}
                    </article>
                  </div>

                  <div className='socials'>
                    {displayInfo?.socials.git && (
                      <a
                        href={`${displayInfo?.socials.git}`}
                        className='social_link'
                        target='_blank'
                      >
                        <AiFillGithub />
                      </a>
                    )}

                    {displayInfo?.socials.X && (
                      <a
                        href={`${displayInfo?.socials.X}`}
                        className='social_link'
                        target='_blank'
                      >
                        <AiOutlineTwitter />
                      </a>
                    )}

                    {displayInfo?.socials.fb && (
                      <a
                        href={`${displayInfo?.socials.fb}`}
                        className='social_link'
                        target='_blank'
                      >
                        <AiFillFacebook />
                      </a>
                    )}

                    {displayInfo?.socials.ins && (
                      <a
                        href={`${displayInfo?.socials.ins}`}
                        className='social_link'
                        target='_blank'
                      >
                        <AiFillInstagram />
                      </a>
                    )}

                    {displayInfo?.socials.be && (
                      <a
                        href={`${displayInfo?.socials.be}`}
                        className='social_link'
                        target='_blank'
                      >
                        <AiFillBehanceSquare />
                      </a>
                    )}
                  </div>
                </div>

                <div className='bottom'>
                  <article className='bottom_opt'>
                    <div className='icon_wrapper'>
                      <FaScroll />
                    </div>
                    <span>{displayInfo?.postCount} posts published</span>
                  </article>

                  <article className='bottom_opt'>
                    <div className='icon_wrapper'>
                      <IoIosPeople />
                    </div>
                    <span>{displayInfo?.followers.length} followers</span>
                  </article>

                  <article className='bottom_opt'>
                    <div className='icon_wrapper'>
                      <BsPersonHearts />
                    </div>
                    <span>{displayInfo?.followings.length} followings</span>
                  </article>
                </div>
              </header>

              <div className='user_posts'>
                <aside>
                  <div className='side_opts'>
                    <article className='side_opt'>
                      <div className='icon_wrapper'>
                        <FaScroll />
                      </div>
                      <span>{displayInfo?.postCount} posts published</span>
                    </article>

                    <article className='side_opt'>
                      <div className='icon_wrapper'>
                        <IoIosPeople />
                      </div>
                      <span>{displayInfo?.followers.length} followers</span>
                    </article>

                    <article className='side_opt'>
                      <div className='icon_wrapper'>
                        <BsPersonHearts />
                      </div>
                      <span>{displayInfo?.followings.length} followings</span>
                    </article>
                  </div>
                </aside>

                {userPosts && (
                  <DisplayPosts posts={modUserPosts} target={'profile'} />
                )}
              </div>
            </div>
          </>
        )
      )}
    </section>
  );
};

export default Profile;
