import React, { useState, useEffect } from 'react';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import BoardSearchLayout from '../../layouts/BoardSearchLayout';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [navItems] = useState([
    {
      title: 'Profile',
      url: '/settings/profile',
    },
    {
      title: 'Account',
      url: '/settings/account',
    },
  ]);

  useEffect(() => {
    navigate('/settings/profile', { replace: true });
  }, []);

  return (
    <BoardSearchLayout
      isPosts={{ status: false, items: [] }}
      heading={`Settings for @dummyUser`}
      navItems={navItems}
      isSearch={false}
      isSettings={true}
    />
  );
};

export default Settings;
export { ProfileSettings, AccountSettings };
