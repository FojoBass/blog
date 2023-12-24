import React, { useState, useEffect } from 'react';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import BoardSearchLayout from '../../layouts/BoardSearchLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBlogSelector } from '../../app/store';

const Settings = () => {
  const {
    isUserLoggedIn,

    userInfo,
  } = useBlogSelector((state) => state.user);
  const navigate = useNavigate();
  const pathname = useLocation()
    .pathname.replace('/profile', '')
    .replace('/account', '');

  const [navItems] = useState([
    {
      title: 'Profile',
      url: `${pathname}/profile`,
    },
    {
      title: 'Account',
      url: `${pathname}/account`,
    },
  ]);

  useEffect(() => {
    if (!isUserLoggedIn) navigate('/enter', { replace: true });
    else navigate(`${pathname}/profile`, { replace: true });
  }, [isUserLoggedIn]);

  return (
    <>
      {isUserLoggedIn && userInfo ? (
        <BoardSearchLayout
          isPosts={{ status: false, items: [] }}
          heading={`Settings for ${userInfo?.userName}`}
          navItems={navItems}
          isSearchSect={false}
          isSettings={true}
        />
      ) : (
        <div className='loader'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </>
  );
};

export default Settings;
export { ProfileSettings, AccountSettings };
