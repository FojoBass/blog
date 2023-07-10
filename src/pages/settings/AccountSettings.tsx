import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState({
      show: false,
      pword: '',
    }),
    [password, setPassword] = useState({ show: false, pword: '' }),
    [confirmPassword, setConfirmPassword] = useState({
      show: false,
      pword: '',
    }),
    [userName, setUserName] = useState('');

  return (
    <div className='acct_settings_wrapper'>
      <form className='change_pword_form settings_form'>
        <fieldset className='form_segment'>
          <legend>Change Password</legend>

          <article className='form_opt'>
            <label htmlFor='current_pword'>Current password</label>
            <div className='input_wrapper'>
              <input
                type={currentPassword.show ? 'text' : 'password'}
                id='current_pword'
                value={currentPassword.pword}
                onChange={(e) =>
                  setCurrentPassword({
                    ...currentPassword,
                    pword: e.target.value,
                  })
                }
              />
              <button
                className='eye_icon_wrapper'
                type='button'
                onClick={() =>
                  setCurrentPassword({
                    ...currentPassword,
                    show: !currentPassword.show,
                  })
                }
              >
                {currentPassword.show ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </article>

          <article className='form_opt'>
            <label htmlFor='pword'>Password</label>
            <div className='input_wrapper'>
              <input
                type={password.show ? 'text' : 'password'}
                id='pword'
                value={password.pword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    pword: e.target.value,
                  })
                }
              />
              <button
                className='eye_icon_wrapper'
                type='button'
                onClick={() =>
                  setPassword({
                    ...password,
                    show: !password.show,
                  })
                }
              >
                {password.show ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </article>

          <article className='form_opt'>
            <label htmlFor='confirm_pword'>Confirm password</label>
            <div className='input_wrapper'>
              <input
                type={confirmPassword.show ? 'text' : 'password'}
                id='confirm_pword'
                value={confirmPassword.pword}
                onChange={(e) =>
                  setConfirmPassword({
                    ...confirmPassword,
                    pword: e.target.value,
                  })
                }
              />
              <button
                type='button'
                className='eye_icon_wrapper'
                onClick={() =>
                  setConfirmPassword({
                    ...confirmPassword,
                    show: !confirmPassword.show,
                  })
                }
              >
                {confirmPassword.show ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </article>

          <button className='spc_btn'>Set New Password</button>
        </fieldset>
      </form>

      <form className='delete_acct settings_form'>
        <fieldset className='form_segment'>
          <legend>Delete Account</legend>

          <div className='warning'>
            <h3>Danger Zone</h3>

            <p>
              Deleting your account will permanently remove your profile along
              with your authentication, all your contents (including comments),
              and allows your username to become available to anyone.
            </p>
          </div>

          <div className='form_opt'>
            <input
              type='text'
              placeholder='Enter Username'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <button className='delete_btn spc_btn' type='button'>
              Delete Account
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AccountSettings;
