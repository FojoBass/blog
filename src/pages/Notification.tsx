import React, { useEffect } from 'react';
import { useBlogSelector } from '../app/store';
import { useNavigate } from 'react-router-dom';
import ComingSoon from './components/ComingSoon';

const Notification = () => {
  const { isUserLoggedIn } = useBlogSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) navigate('/enter', { replace: true });
  }, [isUserLoggedIn]);
  return <>{isUserLoggedIn && <ComingSoon />}</>;
};

export default Notification;
