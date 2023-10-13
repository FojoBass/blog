// TODO ADD A GLOBAL VARIABLE FOR SHOWING menu_btn
import React, { useState, useEffect, useRef } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import avatar from '../../assets/Me cropped.jpg';
import { useBlogDispatch, useBlogSelector } from '../../app/store';
import { toggleTheme } from '../../features/themeSlice';
import { v4 } from 'uuid';
import { blogSlice } from '../../features/blogSlice';
import { useGlobalContext } from '../../context';
import SearchForm from './SearchForm';
import { BlogServices } from '../../services/firebase/blogServices';
import { userSlice } from '../../features/userSlice';
import { StorageFuncs } from '../../services/storages';
import { DropLinkType } from '../../data';

const Navbar = () => {
  const theme = useBlogSelector((state) => state.theme);
  const dispatch = useBlogDispatch();
  const [isDropdown, setIsDropdown] = useState(false);
  const { handleSideNav } = blogSlice.actions;
  const { isUserLoggedIn } = useBlogSelector((state) => state.user);
  const profileOptsRef = useRef<HTMLButtonElement>(null);
  const { userInfo } = useBlogSelector((state) => state.user);
  const { storageKeys } = useGlobalContext();

  return (
    <nav id='nav_sect'>
      <div className='center_sect'>
        <div className='left_side'>
          <button
            className='menu_btn'
            onClick={() => dispatch(handleSideNav())}
          >
            <IoMenuOutline />
          </button>

          <Link to='/' className='home_btn'>
            DB
          </Link>
          <SearchForm />
        </div>

        <div className='right_side'>
          {isUserLoggedIn && (
            <Link to='/new-post' className='create_post_btn create_btn'>
              Create post
            </Link>
          )}

          <button
            className='theme_btn light'
            onClick={() => {
              dispatch(toggleTheme());
              StorageFuncs.setStorage(
                'local',
                storageKeys!.theme,
                theme === 'light' ? 'dark' : 'light'
              );
            }}
          >
            {theme === 'light' ? (
              <FaLightbulb className='light' />
            ) : (
              <FaRegLightbulb className='dark' />
            )}
          </button>

          <NavLink className='search_btn' to={'/search'}>
            <CiSearch />
          </NavLink>

          {!isUserLoggedIn && (
            <Link to='/enter' className='login_btn'>
              Log in
            </Link>
          )}

          {!isUserLoggedIn && (
            <Link to='/join' className='create_acct_btn create_btn'>
              Create account
            </Link>
          )}

          {isUserLoggedIn && (
            <>
              <NavLink to={'/notifications'} className='notification_btn'>
                <IoNotificationsOutline />
              </NavLink>
              <button
                className='profile_opts_btn'
                onClick={() => setIsDropdown(!isDropdown)}
                ref={profileOptsRef}
              >
                <div className='img_wrapper'>
                  <img
                    src={`${userInfo?.aviUrls.smallAviUrl}`}
                    alt='user avatar'
                    className='avatar'
                  />
                </div>{' '}
              </button>
            </>
          )}
        </div>
      </div>

      <DropDown
        drop={isDropdown}
        setDrop={setIsDropdown}
        profileOptsRef={profileOptsRef}
      />
    </nav>
  );
};

// * DROP DOWN PART
export interface DropType {
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
  profileOptsRef: React.RefObject<HTMLButtonElement>;
}

const DropDown: React.FC<DropType> = ({ drop, setDrop, profileOptsRef }) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const { setIsUserLoggedIn } = userSlice.actions;
  const dispatch = useBlogDispatch();
  const navigate = useNavigate();
  const { loginPersistence, storageKeys } = useGlobalContext();
  const { userInfo } = useBlogSelector((state) => state.user);

  const dropLinks: DropLinkType[] = [
    {
      title: 'Username',
      link: `/p/${userInfo?.userId}`,
      param: true,
      position: 'top',
    },
    {
      title: 'Dashboard',
      link: `/${userInfo?.userId}/dashboard`,
      param: true,
      position: 'mid',
    },
    {
      title: 'Create Post',
      link: '/new-post',
      param: false,
      position: 'mid',
    },
    {
      title: 'Settings',
      link: `/settings/${userInfo?.userId}`,
      param: false,
      position: 'mid',
    },
  ];

  const handleSignout = async () => {
    try {
      await new BlogServices().logOut();
      dispatch(setIsUserLoggedIn(false));
      setDrop(false);
      navigate('/');

      if (storageKeys) {
        !loginPersistence &&
          StorageFuncs.clearStorage('session', storageKeys.currUser);
        StorageFuncs.clearStorage(
          loginPersistence ? 'local' : 'session',
          storageKeys.isUserInfo
        );
      }
    } catch (error) {
      console.log(`Log out failed: ${error}`);
    }
  };

  useEffect(() => {
    if (dropRef.current) {
      document.documentElement.onclick = (e: MouseEvent): void => {
        if (
          e.target !== dropRef.current &&
          e.target !== document.querySelector('.profile_opts_btn') &&
          e.target !== dropRef.current?.children[0] &&
          e.target !== dropRef.current?.children[1] &&
          e.target !== dropRef.current?.children[2]
        )
          setDrop(false);
      };
    }
  }, [dropRef, profileOptsRef]);

  return (
    <section className={drop ? ' drop_down active' : 'drop_down'} ref={dropRef}>
      <article className='top'>
        {dropLinks
          .filter((link) => link.position === 'top')
          .map(({ title, link, param }) => {
            // TODO UPDATE MODLINK ONCE AUTH UIS UP AND RUNNING
            // const modLink = param ? link.replace('dum', 'dummies') : link;
            return (
              <Link className='drop_down_links' to={link} key={v4()}>
                {title}
              </Link>
            );
          })}
      </article>
      <article className='mid'>
        {dropLinks
          .filter((link) => link.position === 'mid')
          .map(({ title, link, param }) => {
            // TODO UPDATE MODLINK ONCE AUTH UIS UP AND RUNNING
            const modLink = param ? link.replace('dum', 'dummies') : link;
            return (
              <Link className='drop_down_links' to={modLink} key={v4()}>
                {title}
              </Link>
            );
          })}
      </article>
      <article className='bottom'>
        <button className='drop_down_links' onClick={handleSignout}>
          Sign Out
        </button>
      </article>
    </section>
  );
};

export default Navbar;
