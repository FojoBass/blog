import React, { FormEvent, useState, useRef, useEffect } from 'react';
import {
  AiOutlineHome,
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillBehanceSquare,
} from 'react-icons/ai';
import {
  BsEye,
  BsEyeSlash,
  BsFillPersonFill,
  BsFillLockFill,
} from 'react-icons/bs';
import { MdMail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';
import { GenderInput, ImageInputField, LocationInput } from './components';
import { useGlobalContext } from '../context';
import { useBlogSelector, useBlogDispatch } from '../app/store';
import { regex } from '../data';
import { toast } from 'react-toastify';
import { userSignUp } from '../features/userAsyncThunk';
import { FormDataInt } from '../types';
import InfoForm from './components/InfoForm';
import { StorageFuncs } from '../services/storages';

// TODO For input componenets, make the needed involve global variables

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
