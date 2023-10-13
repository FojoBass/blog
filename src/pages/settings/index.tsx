import React, { useState, useEffect } from 'react';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import BoardSearchLayout from '../../layouts/BoardSearchLayout';
import { useNavigate } from 'react-router-dom';
import { useBlogSelector } from '../../app/store';

const Settings = () => {
  const { isUserLoggedIn, userInfo } = useBlogSelector((state) => state.user);
  const navigate = useNavigate();
  const [navItems] = useState([
    {
      title: 'Profile',
      url: `/settings/${userInfo?.userId}/profile`,
    },
    {
      title: 'Account',
      url: `/settings/${userInfo?.userId}/account`,
    },
  ]);

  useEffect(() => {
    if (!isUserLoggedIn) navigate('/enter', { replace: true });
    else navigate(`/settings/${userInfo?.userId}/profile`, { replace: true });
  }, [isUserLoggedIn]);

  return (
    <>
      {isUserLoggedIn && (
        <BoardSearchLayout
          isPosts={{ status: false, items: [] }}
          heading={`Settings for @dummyUser`}
          navItems={navItems}
          isSearch={false}
          isSettings={true}
        />
      )}
    </>
  );
};

export default Settings;
export { ProfileSettings, AccountSettings };
