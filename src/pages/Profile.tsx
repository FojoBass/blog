import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BsThreeDots, BsBoxArrowUpRight, BsPersonHearts } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { MdCake, MdMail, MdOutlineError } from 'react-icons/md';
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
import { useBlogDispatch, useBlogSelector } from '../app/store';
import { useGlobalContext } from '../context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userSlice } from '../features/userSlice';
import { BlogServices } from '../services/firebase/blogServices';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebase/config';
import { addFollow } from '../features/userAsyncThunk';

const Profile = () => {
  const { isUserLoggedIn, userInfo, followLoading } = useBlogSelector(
    (state) => state.user
  );
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
  const isFollow = useMemo(() => {
    return !!userInfo?.followings.find((flw) => flw.id === uid);
  }, [userInfo?.followings]);
  const dispatch = useBlogDispatch();
  const navigate = useNavigate();

  const handleFollow = () => {
    if (!isUserLoggedIn) navigate('/enter');
    else {
      dispatch(
        addFollow({
          isFollow,
          posterName: displayInfo?.userName ?? '',
          uid: uid ?? '',
          avi: displayInfo?.aviUrls.smallAviUrl ?? '',
        })
      );
    }
  };

  useEffect(() => {
    if (typeof authLoading === 'boolean' && !authLoading) {
      if (uid === userInfo?.uid) {
        setUserInfoLoading(false);
        setDisplayInfo(userInfo);
      } else {
        let fetchUserInfo: any = null;
        (async () => {
          try {
            const res = await blogServices.getUserInfo(uid ?? '');
            fetchUserInfo = res.data();

            setDisplayInfo({
              ...fetchUserInfo,
              createdAt: fetchUserInfo.createdAt.toDate().toString(),
            });
          } catch (error) {
          } finally {
            setUserInfoLoading(false);
          }
        })();
      }
      setTargetUserId && setTargetUserId(uid ?? '');
    }
  }, [uid, userInfo, authLoading]);

  useEffect(() => {
    if (!userInfoLoading && targetUserId) {
      // *Fethces initial first batch of posts
      (async () => {
        try {
          const res = await blogServices.getUserPosts(
            false,
            null,
            targetUserId,
            true,
            10
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

          const lastDocTime =
            res.size && res.docs[res.docs.length - 1].data().createdAt;
          setUserLastDocTime && setUserLastDocTime(lastDocTime);

          setUserPosts && setUserPosts(posts);
        } catch (err) {
        } finally {
          setUserPostsLoading && setUserPostsLoading(false);
          delayListener.current = false;
        }
      })();
    }
  }, [userInfoLoading, targetUserId]);

  useEffect(() => {
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
      ) : !displayInfo ? (
        <div className='empty_info'>
          <span>
            <MdOutlineError />
          </span>
          <h3>User not found</h3>
        </div>
      ) : (
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
                  {isUserLoggedIn &&
                    (uid === userInfo?.uid ? (
                      <Link
                        to={`/settings/${userInfo?.userId}/profile`}
                        className='spc_btn edit_btn'
                      >
                        Edit Profile
                      </Link>
                    ) : (
                      <>
                        <button
                          className={`follow_btn spc_btn ${
                            followLoading ? 'loading' : ''
                          }`}
                          onClick={handleFollow}
                        >
                          {isFollow ? 'Unfollow' : 'Follow'}
                        </button>
                        <button className='more_opts'>
                          <BsThreeDots />
                        </button>
                      </>
                    ))}
                </div>
              </div>

              <div className='mid'>
                <div
                  className='user_info'
                  style={!isUserLoggedIn ? { marginTop: '7rem' } : {}}
                >
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
                      <a
                        href='https://fast.com'
                        target='_blank'
                        rel='noreferrer'
                      >
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
                    Joined on {(displayInfo?.createdAt as string).split(' ')[1]}{' '}
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
                      rel='noreferrer'
                    >
                      <AiFillGithub />
                    </a>
                  )}

                  {displayInfo?.socials.X && (
                    <a
                      href={`${displayInfo?.socials.X}`}
                      className='social_link'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <AiOutlineTwitter />
                    </a>
                  )}

                  {displayInfo?.socials.fb && (
                    <a
                      href={`${displayInfo?.socials.fb}`}
                      className='social_link'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <AiFillFacebook />
                    </a>
                  )}

                  {displayInfo?.socials.ins && (
                    <a
                      href={`${displayInfo?.socials.ins}`}
                      className='social_link'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <AiFillInstagram />
                    </a>
                  )}

                  {displayInfo?.socials.be && (
                    <a
                      href={`${displayInfo?.socials.be}`}
                      className='social_link'
                      target='_blank'
                      rel='noreferrer'
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
                  <span>
                    {displayInfo?.postCount === 1
                      ? `${displayInfo?.postCount} post published`
                      : `${displayInfo?.postCount} posts published`}
                  </span>
                </article>

                <article className='bottom_opt'>
                  <div className='icon_wrapper'>
                    <IoIosPeople />
                  </div>
                  <span>
                    {displayInfo?.followers.length === 1
                      ? `${displayInfo?.followers.length} follower`
                      : `${displayInfo?.followers.length} followers`}
                  </span>
                </article>

                <article className='bottom_opt'>
                  <div className='icon_wrapper'>
                    <BsPersonHearts />
                  </div>
                  <span>
                    {displayInfo?.followings.length === 1
                      ? `${displayInfo?.followings.length} following`
                      : `${displayInfo?.followings.length} followings`}
                  </span>
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
                    <span>
                      {displayInfo?.postCount === 1
                        ? `${displayInfo?.postCount} post published`
                        : `${displayInfo?.postCount} posts published`}
                    </span>
                  </article>

                  <article className='side_opt'>
                    <div className='icon_wrapper'>
                      <IoIosPeople />
                    </div>
                    <span>
                      {displayInfo?.followers.length === 1
                        ? `${displayInfo?.followers.length} follower`
                        : `${displayInfo?.followers.length} followers`}
                    </span>
                  </article>

                  <article className='side_opt'>
                    <div className='icon_wrapper'>
                      <BsPersonHearts />
                    </div>
                    <span>
                      {displayInfo?.followings.length === 1
                        ? `${displayInfo?.followings.length} following`
                        : `${displayInfo?.followings.length} followings`}
                    </span>
                  </article>
                </div>
              </aside>

              {userPosts && (
                <DisplayPosts posts={modUserPosts} target={'profile'} />
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
