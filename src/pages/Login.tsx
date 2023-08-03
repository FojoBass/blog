import React, { useState, useRef, useEffect } from 'react';
import { BsEyeSlash, BsEye, BsGoogle } from 'react-icons/bs';
import { AiOutlineTwitter, AiFillGithub, AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    console.log('inputRef: ', inputRef);
  }, [inputRef]);

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

  return (
    <section className='login_sect'>
      <Link to='/' className='home_btn'>
        <AiOutlineHome />
      </Link>
      <div className='center_sect'>
        <div className='top'>
          <h1>Welcome back</h1>

          <form className='login_form'>
            <article className='form_opt'>
              <input
                type='email'
                placeholder='Email'
                ref={(el) => inputRef.current.push(el)}
                spellCheck='false'
              />
            </article>

            <article className='form_opt'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                ref={(el) => inputRef.current.push(el)}
              />
              <button
                className='eye_icon_wrapper'
                type='button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </article>
            <button type='submit' className='login_btn'>
              Log in
            </button>

            <div className='btns_wrapper'>
              <button className='other_login_btn git_btn' type='button'>
                <AiFillGithub />
              </button>
              <button className='other_login_btn tw_btn' type='button'>
                <AiOutlineTwitter />
              </button>
              <button className='other_login_btn goo_btn' type='button'>
                <BsGoogle />
              </button>
            </div>

            <Link className='signup_btn' to='/join'>
              Don't have an account?
            </Link>
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
