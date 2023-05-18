import React, { useState } from 'react';
import avi from '../assets/Me cropped.jpg';
import { useGlobalContext } from '../context';
import { BsThreeDots, BsBoxArrowUpRight } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { MdCake, MdMail } from 'react-icons/md';
import { FaScroll } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillGithub,
  AiOutlineInstagram,
  AiFillBehanceSquare,
} from 'react-icons/ai';
import { DisplayPosts } from './components';
import { PostsInt } from './Home';

const Profile = () => {
  const { isUserLogged } = useGlobalContext();
  const [userColor, setUserColor] = useState('#000000');
  // todo Dummy Posts to be replaced
  const userPosts: PostsInt[] = [
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
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
                Earth
              </article>

              <article className='more_info_opt'>
                <div className='icon_wrapper'>
                  <MdCake />
                </div>
                Joinded on February 17, 1455
              </article>

              <article className='more_info_opt'>
                <div className='icon_wrapper'>
                  <BsBoxArrowUpRight />
                </div>
                <a href='https://fast.com' target='_blank'>
                  https://fast.com
                </a>
              </article>

              <article className='more_info_opt'>
                <div className='icon_wrapper'>
                  <MdMail />
                </div>
                <a href='mailto: fojo4god@gmail.com'>fojo4god@gmail.com</a>
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
                <AiOutlineInstagram />
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  id='user-love'
                >
                  <path
                    fill='#000'
                    fill-rule='evenodd'
                    d='M9 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM4.5 10a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z'
                    clip-rule='evenodd'
                  ></path>
                  <path
                    fill='#000'
                    fill-rule='evenodd'
                    d='M2.5 20a6.5 6.5 0 1 1 13 0v.28c0 .503-.352.937-.844 1.04l-1.751.369c-1.757.37-3.554.487-5.336.352a.5.5 0 0 1 .076-.997c1.688.128 3.39.017 5.054-.334l1.751-.368a.062.062 0 0 0 .05-.061V20a5.5 5.5 0 1 0-11 0v.28c0 .03.02.055.05.062l1.751.368a.5.5 0 0 1-.206.979l-1.751-.369a1.062 1.062 0 0 1-.844-1.04V20zm15-17.987c1.108-.768 2.66-.674 3.66.283a2.675 2.675 0 0 1 0 3.894L17.846 9.36a.5.5 0 0 1-.692 0l-3.298-3.157-.015-.014.345-.362-.345.362a2.675 2.675 0 0 1 0-3.894c.999-.957 2.55-1.05 3.659-.283zm-2.968 3.454.012.012.003.003L17.5 8.308l2.968-2.84c.71-.68.71-1.771 0-2.45-.722-.69-1.9-.69-2.622 0a.5.5 0 0 1-.692 0c-.721-.69-1.9-.69-2.622 0-.71.679-.71 1.77 0 2.45z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </div>
              <span>10</span> followings
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
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    id='user-love'
                  >
                    <path
                      fill='#000'
                      fill-rule='evenodd'
                      d='M9 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM4.5 10a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z'
                      clip-rule='evenodd'
                    ></path>
                    <path
                      fill='#000'
                      fill-rule='evenodd'
                      d='M2.5 20a6.5 6.5 0 1 1 13 0v.28c0 .503-.352.937-.844 1.04l-1.751.369c-1.757.37-3.554.487-5.336.352a.5.5 0 0 1 .076-.997c1.688.128 3.39.017 5.054-.334l1.751-.368a.062.062 0 0 0 .05-.061V20a5.5 5.5 0 1 0-11 0v.28c0 .03.02.055.05.062l1.751.368a.5.5 0 0 1-.206.979l-1.751-.369a1.062 1.062 0 0 1-.844-1.04V20zm15-17.987c1.108-.768 2.66-.674 3.66.283a2.675 2.675 0 0 1 0 3.894L17.846 9.36a.5.5 0 0 1-.692 0l-3.298-3.157-.015-.014.345-.362-.345.362a2.675 2.675 0 0 1 0-3.894c.999-.957 2.55-1.05 3.659-.283zm-2.968 3.454.012.012.003.003L17.5 8.308l2.968-2.84c.71-.68.71-1.771 0-2.45-.722-.69-1.9-.69-2.622 0a.5.5 0 0 1-.692 0c-.721-.69-1.9-.69-2.622 0-.71.679-.71 1.77 0 2.45z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </div>
                <span>10</span> followings
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
