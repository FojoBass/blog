// TODO ADD A GLOBAL VARIABLE FOR SHOWING menu_btn
import React, { useState, useEffect } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import avatar from '../../assets/Me cropped.jpg';
import { useBlogDispatch, useBlogSelector } from '../../app/store';
import { toggleTheme } from '../../features/themeSlice';
import { dropLinks } from '../../data';
import { v4 } from 'uuid';
import { blogSlice } from '../../features/blogSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useBlogSelector((state) => state.theme);
  const dispatch = useBlogDispatch();
  const [isDropdown, setIsDropdown] = useState(false);
  const { isOpenSideNav } = useBlogSelector((state) => state.blog);
  const { handeSideNav } = blogSlice.actions;
  const [isUserLogged, setIsUserLogged] = useState(true); //todo This will be changed once auth is setup
  return (
    <nav>
      <div className='center_sect'>
        <div className='left_side'>
          <button className='menu_btn' onClick={() => dispatch(handeSideNav())}>
            <IoMenuOutline />
          </button>

          <Link to='/' className='home_btn'>
            DB
          </Link>
          <div className='search_wrapper'>
            <input type='text' placeholder='Search...' />
            <button className='search_btn'>
              <CiSearch />
            </button>
          </div>
        </div>

        <div className='right_side'>
          {isUserLogged && (
            <Link to='/new-post' className='create_post_btn create_btn'>
              Create post
            </Link>
          )}

          <button
            className='theme_btn light'
            onClick={() => dispatch(toggleTheme())}
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

          {!isUserLogged && (
            <Link to='/enter' className='login_btn'>
              Log in
            </Link>
          )}

          {!isUserLogged && (
            <Link to='/join' className='create_acct_btn create_btn'>
              Create account
            </Link>
          )}

          {isUserLogged && (
            <>
              <NavLink to={'/notifications'} className='notification_btn'>
                <IoNotificationsOutline />
              </NavLink>
              <button
                className='profile_opts_btn'
                onClick={() => setIsDropdown(!isDropdown)}
              >
                <div className='img_wrapper'>
                  <img src={avatar} alt='avatar' className='avatar' />
                </div>{' '}
              </button>
            </>
          )}
        </div>
      </div>

      <DropDown drop={isDropdown} setDrop={setIsDropdown} />
    </nav>
  );
};

export interface DropType {
  drop: boolean;
  setDrop: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown: React.FC<DropType> = ({ drop, setDrop }) => {
  const handleSignout = () => {
    setDrop(false);
  };

  return (
    <section className={drop ? ' drop_down active' : 'drop_down'}>
      <article className='top'>
        {dropLinks
          .filter((link) => link.position === 'top')
          .map(({ title, link, param }) => {
            // TODO UPDATE MODLINK ONCE AUTH UIS UP AND RUNNING
            const modLink = param ? link.replace('dum', 'dummies') : link;
            return (
              <Link
                className='drop_down_links'
                to={modLink}
                onClick={() => setDrop(false)}
                key={v4()}
              >
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
              <Link
                className='drop_down_links'
                to={modLink}
                onClick={() => setDrop(false)}
                key={v4()}
              >
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
