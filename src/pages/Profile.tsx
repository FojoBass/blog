import React, { useState } from 'react';
import avi from '../assets/Me cropped.jpg';
import { useGlobalContext } from '../context';
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
import { DisplayPosts } from './components';
import { PostsInt } from '../types';
import { v4 } from 'uuid';

const Profile = () => {
  const { isUserLogged } = useGlobalContext();
  const [userColor, setUserColor] = useState('#000000');
  // todo Dummy Posts to be replaced
  const userPosts: PostsInt[] = [
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
    { isDummy: true, id: v4() },
  ];
  return (
    <section id='profile_sect'>
      <div
        className='head_overlay'
        style={{ backgroundColor: userColor }}
      ></div>

      <div className='center_sect profile_wrapper'>
        <header className='profile_header'>
          <div className='top'>
            <div className='img_wrapper' style={{ backgroundColor: userColor }}>
              <img src={avi} alt='' />
            </div>

            <div className='right_side'>
              {isUserLogged ? (
                <button className='spc_btn edit_btn'>Edit Profile</button>
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
              <h3 className='user_name'>user name</h3>
              <p className='about_user'>
                I am me, and I am also Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Dolorum nostrum eligendi minus, esse adipisci
                eum!
              </p>
            </div>

            <div className='more_info'>
              <article className='more_info_opt'>
                <div className='icon_wrapper'>
                  <ImLocation2 />
                </div>
                Africa, Earth
              </article>

              <article className='more_info_opt'>
                <a href='mailto: fojo4god@gmail.com'>
                  <div className='icon_wrapper'>
                    <MdMail />
                  </div>
                  fojo4god@gmail.com
                </a>
              </article>

              <article className='more_info_opt'>
                <a href='https://fast.com' target='_blank'>
                  <div className='icon_wrapper'>
                    <BsBoxArrowUpRight />
                  </div>
                  https://fast.com
                </a>
              </article>

              <article className='more_info_opt'>
                <div className='icon_wrapper'>
                  <MdCake />
                </div>
                Joined on Feb 17, 1455
              </article>
            </div>

            <div className='socials'>
              <a
                href='https://github.com'
                className='social_link'
                target='_blank'
              >
                <AiFillGithub />
              </a>

              <a
                href='https://twitter.com'
                className='social_link'
                target='_blank'
              >
                <AiOutlineTwitter />
              </a>

              <a href='https://fb.com' className='social_link' target='_blank'>
                <AiFillFacebook />
              </a>

              <a
                href='https://instagram.com'
                className='social_link'
                target='_blank'
              >
                <AiFillInstagram />
              </a>

              <a
                href='https://behance.com'
                className='social_link'
                target='_blank'
              >
                <AiFillBehanceSquare />
              </a>
            </div>
          </div>

          <div className='bottom'>
            <article className='bottom_opt'>
              <div className='icon_wrapper'>
                <FaScroll />
              </div>
              <span>{51} posts published</span>
            </article>

            <article className='bottom_opt'>
              <div className='icon_wrapper'>
                <IoIosPeople />
              </div>
              <span>{5} followers</span>
            </article>

            <article className='bottom_opt'>
              <div className='icon_wrapper'>
                <BsPersonHearts />
              </div>
              <span>10 followings</span>
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
                <span>{51} posts published</span>
              </article>

              <article className='side_opt'>
                <div className='icon_wrapper'>
                  <IoIosPeople />
                </div>
                <span>{5} followers</span>
              </article>

              <article className='side_opt'>
                <div className='icon_wrapper'>
                  <BsPersonHearts />
                </div>
                <span>10 followings</span>
              </article>
            </div>
          </aside>

          <DisplayPosts posts={userPosts} />
        </div>
      </div>
    </section>
  );
};

export default Profile;
