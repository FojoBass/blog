import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id='footer_sect'>
      <div className='footer_wrapper'>
        <ul className='nav_links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/know-us'>About</Link>
          </li>
          <li>
            <Link to='/meet-us'>Contact</Link>
          </li>
          <li>
            <Link to='/faqs'>FAQ</Link>
          </li>
          <li>
            <Link to='/'>Privacy Policy</Link>
          </li>
          <li>
            <Link to='/'>Code of Conduct</Link>
          </li>
          <li>
            <Link to='/'>Terms of use</Link>
          </li>
        </ul>

        <div className='owner'>
          <p>
            copyright © {new Date().getFullYear()} <Link to='/'>Devie</Link>.
          </p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
