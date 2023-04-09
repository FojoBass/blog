import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='center_sect'>
      <div className='left_side'>
        <button className='menu_btn'>
          <HiMenu />
        </button>

        <Link to='/' className='home_btn'>
          DB
        </Link>
      </div>

      <div className='right_side'>
        <button className='search_btn'>
          <FaSearch />
        </button>

        <button className='notification_btn'>
          <IoNotificationsOutline />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
