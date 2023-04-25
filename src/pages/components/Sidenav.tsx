import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { sideNavLinks, socialLinks } from '../../data';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { useBlogSelector, useBlogDispatch } from '../../app/store';
import { blogSlice } from '../../features/blogSlice';
import { log } from 'console';

const Sidenav = () => {
  const { isOpenSideNav } = useBlogSelector((state) => state.blog);
  const dispatch = useBlogDispatch();
  const { handeSideNav } = blogSlice.actions;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget.children[0]) {
      dispatch(handeSideNav());
    }
  };

  return (
    <section
      className={isOpenSideNav ? 'side_nav_sect active' : 'side_nav_sect'}
      onClick={handleClose}
    >
      <aside className={isOpenSideNav ? 'side_nav active' : 'side_nav'}>
        <h3 className='heading'>
          Lorem{' '}
          <button className='close_btn'>
            <AiOutlineClose />
          </button>
        </h3>

        <div className='side_nav_opts'>
          {sideNavLinks.map(({ Icon, title, link }) => {
            return (
              <Link className='side_nav_opt' key={v4()} to={link}>
                <span className='icon'>
                  <Icon />
                </span>
                <span className='title'>{title}</span>
              </Link>
            );
          })}
        </div>

        <div className='side_nav_socials'>
          {socialLinks.map(({ Icon, link }) => {
            return (
              <Link
                className='side_nav_social'
                to={link}
                key={v4()}
                target='_blank'
              >
                <Icon />
              </Link>
            );
          })}
        </div>
      </aside>
    </section>
  );
};

export default Sidenav;
