import React, { useState, useRef, useEffect } from 'react';
import { BsEyeSlash, BsEye, BsGoogle } from 'react-icons/bs';
import { AiOutlineTwitter, AiFillGithub, AiOutlineHome } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { userSlice } from '../features/userSlice';
import { toast } from 'react-toastify';
import { useBlogSelector, useBlogDispatch } from '../app/store';
import { userGitSignIn, userSignIn } from '../features/userAsyncThunk';
import { useGlobalContext } from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const { setIsSignedUp, resetAuthError, resetIsJustLoggedIn } =
    userSlice.actions;
  const { isSignedUp, isLogInLoading, isJustLoggedIn, signInError } =
    useBlogSelector((state) => state.user);
  const dispatch = useBlogDispatch();

  const { setLoginPersistence } = useGlobalContext();

  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pword) toast.error('All fields are required');
    else dispatch(userSignIn({ email, password: pword }));
  };

  const handleGitSignIn = () => {
    console.log('git signin clicked');
    dispatch(userGitSignIn());
  };

  useEffect(() => {
    if (inputRef.current.find((item) => item)) {
      const els = [...new Set(inputRef.current.filter((item) => item))];

      els.forEach((el) => {
        if (el) {
          el.onfocus = () => {
            if (el) {
              el.parentElement?.classList.add('focus');
            }
          };

          el.onblur = () => {
            if (!el.value) {
              el.parentElement?.classList.remove('focus');
            }
          };
        }
      });
    }
  }, [inputRef]);

  useEffect(() => {
    if (isSignedUp) {
      toast.success('Signup successful', { toastId: 'signup_success' });
      dispatch(setIsSignedUp(false));
    }
  }, [isSignedUp]);

  useEffect(() => {
    if (
      signInError.includes('user-not-found') ||
      signInError.includes('wrong-password') ||
      signInError.includes('invalid-login-credentials')
    )
      toast.error('Incorrect email or password');
    if (signInError.includes('Account does not exist'))
      toast.error('Account does not exist');
    if (signInError.includes('network-request-failed'))
      toast.error('Check network connection and try again');

    dispatch(resetAuthError(''));
  }, [signInError]);

  useEffect(() => {
    if (isJustLoggedIn) {
      navigate('/');
      dispatch(resetIsJustLoggedIn(''));
    }
  }, [isJustLoggedIn]);

  return (
    <section className='login_sect'>
      <Link to='/' className='home_btn'>
        <AiOutlineHome />
      </Link>
      <div
        className='center_sect'
        style={isLogInLoading ? { pointerEvents: 'none' } : {}}
      >
        <div className='top'>
          <h1>Welcome back</h1>

          <form className='login_form' onSubmit={handleSubmit}>
            <article className='form_opt'>
              <input
                type='email'
                placeholder='Email'
                ref={(el) => inputRef.current.push(el)}
                spellCheck='false'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </article>

            <article className='form_opt'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                ref={(el) => inputRef.current.push(el)}
                value={pword}
                onChange={(e) => setPword(e.target.value)}
              />
              <button
                className='eye_icon_wrapper'
                type='button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </article>
            <button
              type='submit'
              className={`login_btn ${isLogInLoading ? 'loading' : ''}`}
            >
              {isLogInLoading ? 'Logging in...' : 'Log in'}
            </button>

            <div className='btns_wrapper'>
              <button
                className={`other_login_btn git_btn ${
                  isLogInLoading ? 'loading' : ''
                }`}
                type='button'
                onClick={handleGitSignIn}
              >
                <AiFillGithub />
              </button>
              <button
                className={`other_login_btn tw_btn ${
                  isLogInLoading ? 'loading' : ''
                }`}
                type='button'
              >
                <AiOutlineTwitter />
              </button>
              <button
                className={`other_login_btn goo_btn ${
                  isLogInLoading ? 'loading' : ''
                }`}
                type='button'
              >
                <BsGoogle />
              </button>
            </div>

            <footer>
              <Link className='signup_btn' to='/join'>
                Don't have an account?
              </Link>

              <div className='box_wrapper'>
                <input
                  type='checkbox'
                  id='logged_in'
                  onChange={(e) =>
                    setLoginPersistence && setLoginPersistence(e.target.checked)
                  }
                />
                <label htmlFor='logged_in'>Keep me logged in</label>
              </div>
            </footer>
          </form>
        </div>

        {/* <div className='img_wrapper'>
          <img src={signinImg} alt='' />
        </div> */}
      </div>
    </section>
  );
};

export default Login;
