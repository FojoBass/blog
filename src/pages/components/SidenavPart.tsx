import React from 'react';
import { sideNavLinks, socialLinks } from '../../data';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

const SidenavPart = () => {
  return (
    <>
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
    </>
  );
};

export default SidenavPart;
