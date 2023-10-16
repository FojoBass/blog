import React, { useState, useEffect } from 'react';
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
import { PostsInt, UserInfoInt } from '../types';
import { v4 } from 'uuid';
import { useBlogSelector } from '../app/store';
import { useGlobalContext } from '../context';
import { Link, useParams } from 'react-router-dom';
import { userSlice } from '../features/userSlice';

const Profile = () => {
  const { isUserLoggedIn, userInfo } = useBlogSelector((state) => state.user);
  const { username } = useParams();
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [displayInfo, setDisplayInfo] = useState<UserInfoInt | null>(null);

  // todo Dummy Posts to be replaced
  const userPosts: PostsInt[] = [
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
  ];

  useEffect(() => {
    if (username === userInfo?.userId) {
      setUserInfoLoading(false);
      setDisplayInfo(userInfo);
    }
  }, [username, userInfo]);

  return (
    <section id='profile_sect'>
      {userInfoLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className='head_overlay'
            style={{ backgroundColor: displayInfo?.userColor }}
          ></div>

          <div className='center_sect profile_wrapper'>
            <header className='profile_header'>
              <div className='top'>
                <div
                  className='img_wrapper'
                  style={{ backgroundColor: displayInfo?.userColor }}
                >
                  <img
                    src={`${displayInfo?.aviUrls.bigAviUrl}`}
                    alt='user avatar'
                  />
                </div>

                <div className='right_side'>
                  {isUserLoggedIn ? (
                    username === userInfo?.userId ? (
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

              <DisplayPosts posts={userPosts} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
