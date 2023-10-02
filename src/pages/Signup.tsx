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
  const { gender, country, state, aviBigFile, aviSmallFile } =
    useGlobalContext();
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
    }
  }, [isSignedUp]);

  return (
    <section className='signup_sect'>
      <Link to='/' className='home_btn'>
        <AiOutlineHome />
      </Link>

      <InfoForm type={'signup'} loading={isSignupLoading} />

      {/* <div className='center_sect'>
        <div className='top'>
          <h1>
            <span className='before'></span>Sign up
            <span className='after'></span>
          </h1>

          <form className='signup_form' onSubmit={handleSubmit}>
            <article className='info_wrapper basics'>
              <h3>Basic</h3>

              <div className='form_opt_wrapper'>
                <article className='form_opt'>
                  <span className='form_opt_icon'>
                    <BsFillPersonFill />
                  </span>
                  <input
                    type='text'
                    name='full_name'
                    placeholder='Full name (25 chars max)'
                    spellCheck='false'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    maxLength={25}
                    ref={formRefs.fullNameInputRef}
                  />
                </article>

                <article className='form_opt'>
                  <span className='form_opt_icon'>
                    <MdMail />
                  </span>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={formRefs.emailInputRef}
                  />
                </article>

                <article className='form_opt'>
                  <span className='form_opt_icon'>
                    <BsFillLockFill />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={formRefs.passwordInputRef}
                  />

                  <button
                    className='eye_icon_wrapper'
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </article>

                <article className='form_opt'>
                  <span className='form_opt_icon'>
                    <BsFillLockFill />
                  </span>
                  <input
                    type={showConPassword ? 'text' : 'password'}
                    name='con_password'
                    placeholder='Confirm Password'
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    ref={formRefs.conPasswordInputRef}
                  />

                  <button
                    className='eye_icon_wrapper'
                    type='button'
                    onClick={() => setShowConPassword(!showConPassword)}
                  >
                    {!showConPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </article>

                <article className='form_opt'>
                  <span className='form_opt_icon'>
                    <BsFillPersonFill />
                  </span>
                  <input
                    type='text'
                    name='user_name'
                    placeholder='User name (25 chars max)'
                    spellCheck='false'
                    value={userName}
                    maxLength={25}
                    onChange={(e) => setUserName(e.target.value)}
                    ref={formRefs.userNameInputRef}
                  />
                </article>
              </div>
            </article>

            <article className='info_wrapper additionals'>
              <h3>Additional</h3>

              <div className='form_opt_wrapper'>
                <LocationInput />

                <article className='form_opt'>
                  <label htmlFor='dob'>Birthday</label>
                  <input
                    type='date'
                    name='dob'
                    id='dob'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={{
                      border: '2px solid var(--brd_clr)',
                      padding: '5px 10px',
                      borderRadius: '10px',
                    }}
                  />
                </article>

                <GenderInput />
              </div>
            </article>

            <article className='info_wrapper'>
              <h3>Bio</h3>

              <textarea
                name='bio'
                cols={30}
                rows={8}
                placeholder='Give a brief description about yourself'
                maxLength={300}
                minLength={10}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </article>

            <article className='info_wrapper'>
              <h3>Socials</h3>

              <div className='form_opt_wrapper'>
                <article className='social_opt'>
                  <span className='social_icon'>
                    <AiFillGithub />
                  </span>
                  <input
                    type='url'
                    name='git_link'
                    placeholder='Github'
                    value={socials.git}
                    onChange={(e) =>
                      setSocials({ ...socials, git: e.target.value })
                    }
                  />
                </article>

                <article className='social_opt'>
                  <span className='social_icon'>
                    <AiOutlineTwitter />
                  </span>
                  <input
                    type='url'
                    name='twi_link'
                    placeholder='Twitter'
                    value={socials.X}
                    onChange={(e) =>
                      setSocials({ ...socials, X: e.target.value })
                    }
                  />
                </article>

                <article className='social_opt'>
                  <span className='social_icon'>
                    <AiFillFacebook />
                  </span>
                  <input
                    type='url'
                    name='fb_link'
                    placeholder='Facebook'
                    value={socials.fb}
                    onChange={(e) =>
                      setSocials({ ...socials, fb: e.target.value })
                    }
                  />
                </article>

                <article className='social_opt'>
                  <span className='social_icon'>
                    <AiFillInstagram />
                  </span>
                  <input
                    type='url'
                    name='ins_link'
                    placeholder='Instagram'
                    value={socials.ins}
                    onChange={(e) =>
                      setSocials({ ...socials, ins: e.target.value })
                    }
                  />
                </article>

                <article className='social_opt'>
                  <span className='social_icon'>
                    <AiFillBehanceSquare />
                  </span>
                  <input
                    type='url'
                    name='be_link'
                    placeholder='Behance'
                    value={socials.be}
                    onChange={(e) =>
                      setSocials({ ...socials, be: e.target.value })
                    }
                  />
                </article>

                <article className='social_opt'>
                  <span className='social_icon'>
                    <FaLink />
                  </span>
                  <input
                    type='url'
                    name='url_link'
                    placeholder='Url (e.g portfolio link)'
                    value={socials.url}
                    onChange={(e) =>
                      setSocials({ ...socials, url: e.target.value })
                    }
                  />
                </article>
              </div>
            </article>

            <article className='info_wrapper avi'>
              <h3>Profile image</h3>

              <ImageInputField />
            </article>

            <button
              type='submit'
              className={`reg_btn spc_btn ${isSignupLoading ? 'loading' : ''}`}
            >
              {isSignupLoading ? 'Registering...' : 'Register'}
            </button>
            <Link className='login_btn' to='/enter'>
              Already have an account?
            </Link>
          </form>
        </div>
      </div> */}
    </section>
  );
};

export default Signup;
