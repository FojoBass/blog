import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';
import { GenderInput, ImageInputField, LocationInput } from './components';

// TODO For input componenets, make the needed involve global variables

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false),
    [showConPassword, setShowConPassword] = useState(false),
    [fullName, setFullName] = useState(''),
    [userName, setUserName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [conPassword, setConPassword] = useState(''),
    [dob, setDob] = useState(''),
    [gender, setGender] = useState('male'),
    [bio, setBio] = useState(''),
    [socials, setSocials] = useState({
      git: '',
      twi: '',
      ins: '',
      be: '',
      fb: '',
      url: '',
    });

  return (
    <section className='signup_sect'>
      <Link to='/' className='home_btn'>
        <AiOutlineHome />
      </Link>

      <div className='center_sect'>
        <div className='top'>
          <h1>
            <span className='before'></span>Sign up
            <span className='after'></span>
          </h1>

          <form className='signup_form'>
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
                    onChange={(e) => setUserName(e.target.value)}
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
                    value={socials.twi}
                    onChange={(e) =>
                      setSocials({ ...socials, twi: e.target.value })
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

            <button type='submit' className='reg_btn spc_btn'>
              Register
            </button>
            <Link className='login_btn' to='/enter'>
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
