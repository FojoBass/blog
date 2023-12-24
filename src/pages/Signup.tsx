import React, { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useBlogSelector } from '../app/store';
import InfoForm from './components/InfoForm';
import { StorageFuncs } from '../services/storages';

interface FormRefsInt {
  fullNameInputRef: React.RefObject<HTMLInputElement>;
  userNameInputRef: React.RefObject<HTMLInputElement>;
  emailInputRef: React.RefObject<HTMLInputElement>;
  passwordInputRef: React.RefObject<HTMLInputElement>;
  conPasswordInputRef: React.RefObject<HTMLInputElement>;
}

const Signup = () => {
  const { isSignedUp, isSignupLoading } = useBlogSelector(
    (state) => state.user
  );

  const { loginPersistence, storageKeys } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedUp) {
      navigate('/enter');

      if (storageKeys) {
        StorageFuncs.clearStorage(
          loginPersistence ? 'local' : 'session',
          storageKeys.isUserInfo
        );

        StorageFuncs.clearStorage(
          loginPersistence ? 'local' : 'session',
          storageKeys.userInfoData
        );
      }
    }
  }, [isSignedUp, storageKeys]);

  return (
    <section className='signup_sect'>
      <Link to='/' className='home_btn'>
        <AiOutlineHome />
      </Link>

      <InfoForm type={'signup'} loading={isSignupLoading} />
    </section>
  );
};

export default Signup;
