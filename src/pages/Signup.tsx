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
  const blogTheme = useBlogSelector((state) => state.theme);
  const { isSignedUp, isSignupLoading } = useBlogSelector(
    (state) => state.user
  );
  const [showPassword, setShowPassword] = useState(false),
    [showConPassword, setShowConPassword] = useState(false),
    [fullName, setFullName] = useState(''),
    [userName, setUserName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [conPassword, setConPassword] = useState(''),
    [dob, setDob] = useState(''),
    [bio, setBio] = useState(''),
    [socials, setSocials] = useState({
      git: '',
      X: '',
      ins: '',
      be: '',
      fb: '',
      url: '',
    });
  const {
    gender,
    country,
    state,
    aviBigFile,
    aviSmallFile,
    loginPersistence,
    storageKeys,
  } = useGlobalContext();
  const dispatch = useBlogDispatch();
  const navigate = useNavigate();

  const formRefs: FormRefsInt = {
    fullNameInputRef: useRef<HTMLInputElement>(null),
    userNameInputRef: useRef<HTMLInputElement>(null),
    emailInputRef: useRef<HTMLInputElement>(null),
    passwordInputRef: useRef<HTMLInputElement>(null),
    conPasswordInputRef: useRef<HTMLInputElement>(null),
  };

  const formRefsAction = (ref: keyof FormRefsInt, msg: string) => {
    toast.warn(msg);
    formRefs[ref].current?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      validateFullName() &&
      validateEmail() &&
      validatePassword() &&
      validateConPassword() &&
      validateUsername() &&
      validateCountryState() &&
      validateDob() &&
      validateSocials() &&
      validateAvi()
    ) {
      if (country && state && gender && aviBigFile && aviSmallFile) {
        const formData: FormDataInt = {
          fullName,
          userName,
          country,
          state,
          dob,
          bio,
          gender,
          socials,
        };
        dispatch(
          userSignUp({
            email,
            password,
            formData,
            bigAviFile: aviBigFile,
            smallAviFile: aviSmallFile,
          })
        );
      }
    }
  };

  const validateFullName = (): boolean => {
    if (regex.alpha.test(fullName)) return true;

    formRefsAction('fullNameInputRef', 'Invalid fullname');
    return false;
  };

  const validateUsername = (): boolean => {
    if (regex.alphaNumberic.test(userName)) return true;

    formRefsAction('userNameInputRef', 'Invalid username');
    return false;

    // todo check if any any user has that username
    // todo can create a username collection for that
  };

  const validateSocials = (): boolean => {
    let returnValue = true;
    [
      socials.git,
      socials.fb,
      socials.be,
      socials.ins,
      socials.X,
      socials.url,
    ].forEach((url) => {
      if (url.length && !regex.url.test(url)) {
        toast.warn('Enter valid social link');
        returnValue = false;
      }
    });

    return returnValue;
  };

  const validateCountryState = (): boolean => {
    if (country?.name && state) return true;
    toast.warn('Select Country and State');
    return false;
  };

  const validateDob = (): boolean => {
    if (dob) return true;
    toast.warn('Enter Date of Birth');
    return false;
  };

  const validateEmail = (): boolean => {
    if (regex.email.test(email)) return true;
    formRefsAction('emailInputRef', 'Enter valid email');
    return false;
  };

  const validatePassword = (): boolean => {
    if (password.length < 8) {
      formRefsAction(
        'passwordInputRef',
        "Password's char should be at least 8"
      );
      return false;
    }
    // ! ENSURE TO CHANGE BACK TO STRONG PASSWORD
    if (regex.alphaNumberic.test(password)) return true;

    formRefsAction(
      'passwordInputRef',
      'Password should contain at least one; uppercase letter, lowercase letter, digit, and spceial character'
    );
    return false;
  };

  const validateConPassword = (): boolean => {
    if (conPassword === password) return true;
    formRefsAction('conPasswordInputRef', 'Must be same with password');
    return false;
  };

  const validateAvi = (): boolean => {
    if (aviBigFile && aviSmallFile) return true;

    toast.warn('Select Profile Image');
    return false;
  };

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
