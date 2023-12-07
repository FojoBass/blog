import React, { useState, useRef, useEffect } from 'react';
import {
  BsEyeSlash,
  BsEye,
  BsGoogle,
  BsFillArrowLeftSquareFill,
} from 'react-icons/bs';
import { AiOutlineTwitter, AiFillGithub, AiOutlineHome } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { userSlice } from '../features/userSlice';
import { toast } from 'react-toastify';
import { useBlogSelector, useBlogDispatch } from '../app/store';
import {
  forgotPword,
  userGitSignIn,
  userGooSignIn,
  userSignIn,
} from '../features/userAsyncThunk';
import { useGlobalContext } from '../context';
import { BlogServices } from '../services/firebase/blogServices';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const { setIsSignedUp, setAuthError, setIsJustLoggedIn } = userSlice.actions;
  const { isSignedUp, isLogInLoading, isJustLoggedIn, signInError } =
    useBlogSelector((state) => state.user);
  const dispatch = useBlogDispatch();

  const { setLoginPersistence, setIsVerifyOpen, loginPersistence } =
    useGlobalContext();

  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');

  const [isForgot, setIsForgot] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pword)
      toast.error('All fields are required', { toastId: 'login_error' });
    else {
      dispatch(userSignIn({ email, password: pword }));
      setIsVerifyOpen && setIsVerifyOpen(true);
    }
  };

  const handleGitSignIn = () => {
    dispatch(userGitSignIn());
    setIsVerifyOpen && setIsVerifyOpen(true);
  };

  const handleGooSignIn = () => {
    dispatch(userGooSignIn());
    setIsVerifyOpen && setIsVerifyOpen(true);
  };

  const handleForgotClicked = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) dispatch(forgotPword({ email }));
    else toast.error('Enter email', { toastId: 'login_error' });
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
  }, [inputRef, isForgot]);

  useEffect(() => {
    if (isSignedUp) {
      toast.success('Signup successful', { toastId: 'signup_success' });
      dispatch(setIsSignedUp(false));
    }
  }, [isSignedUp]);

  useEffect(() => {
    if (
      (signInError.includes('user-not-found') && !isForgot) ||
      signInError.includes('wrong-password') ||
      signInError.includes('invalid-login-credentials')
    )
      toast.error('Incorrect email or password');
    if (signInError.includes('Account does not exist'))
      toast.error('Account does not exist');
    if (signInError.includes('network-request-failed'))
      toast.error('Check network connection and try again');
    if (signInError.includes('user-not-found') && isForgot)
      toast.error('User not found');
    else if (signInError && isForgot) toast.error('Failed! Please retry');
    dispatch(setAuthError(''));
  }, [signInError, isForgot]);

  useEffect(() => {
    if (isJustLoggedIn && !isForgot) {
      navigate('/');
      dispatch(setIsJustLoggedIn(false));
    } else if (isJustLoggedIn && isForgot) {
      toast.success('Reset link sent to mail');
      setIsForgot(false);
      setEmail('');
      setPword('');
      dispatch(setIsJustLoggedIn(false));
    }
  }, [isJustLoggedIn, isForgot]);

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
          {isForgot ? (
            <>
              <h1>
                Forgot Password{' '}
                {!isLogInLoading && (
                  <button
                    className='back_btn'
                    onClick={() => setIsForgot(false)}
                  >
                    <BsFillArrowLeftSquareFill />
                  </button>
                )}
              </h1>

              <form className='login_form' onSubmit={handleForgotClicked}>
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

                <button
                  type='submit'
                  className={`login_btn ${isLogInLoading ? 'loading' : ''}`}
                >
                  {isLogInLoading ? 'Sending...' : 'Reset'}
                </button>
              </form>
            </>
          ) : (
            <>
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
                  type='button'
                  className='forgot_btn'
                  onClick={() => setIsForgot(true)}
                >
                  Forgot password?
                </button>

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
                    onClick={handleGooSignIn}
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
                      checked={loginPersistence}
                      onChange={(e) =>
                        setLoginPersistence &&
                        setLoginPersistence(e.target.checked)
                      }
                    />
                    <label htmlFor='logged_in'>Keep me logged in</label>
                  </div>
                </footer>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
