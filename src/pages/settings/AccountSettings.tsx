import React, { FormEvent, useState, useEffect } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useBlogDispatch, useBlogSelector } from '../../app/store';
import { forgotPword } from '../../features/userAsyncThunk';
import { toast } from 'react-toastify';
import { userSlice } from '../../features/userSlice';
import { BlogServices } from '../../services/firebase/blogServices';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { auth } from '../../services/firebase/config';

const AccountSettings = () => {
  const [userName, setUserName] = useState('');
  const { userInfo, isLogInLoading, isJustLoggedIn, signInError } =
    useBlogSelector((state) => state.user);
  const { setIsJustLoggedIn, setAuthError, setNoUserInfo } = userSlice.actions;
  const dispatch = useBlogDispatch();
  const [click, setClick] = useState(false);
  const blogServices = new BlogServices();
  const { logOut, setDelAcc, delAcc, isDemo } = useGlobalContext();

  const navigate = useNavigate();

  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPword({ email: userInfo?.email! }));
  };

  const handleDel = async (e: FormEvent) => {
    e.preventDefault();

    if (isDemo) {
      toast.error('Deleting profile not available for demo account');
      return;
    }

    if (userName === userInfo?.userName) {
      if (!click) {
        toast.warn(
          'You are about to permanently delete your account. Click delete button again to confirm'
        );
        setClick(true);
      }
      if (click) {
        setDelAcc && setDelAcc(true);

        try {
          await blogServices.delUserInfo(auth.currentUser?.uid ?? '');
          await blogServices.delUser();
          logOut && logOut();
          navigate('/');
          toast.success('Account deleted');
        } catch (error) {
          toast.error('Account deletion failed');
        } finally {
          setDelAcc && setDelAcc(false);
        }
      }
    } else toast.info('Username incorrect');
  };

  useEffect(() => {
    if (isJustLoggedIn) {
      toast.success('Reset link sent to mail');
      dispatch(setIsJustLoggedIn(false));
    }

    if (signInError) {
      toast.error('Failed! Please retry');
      dispatch(setAuthError(''));
    }
  }, [isJustLoggedIn, signInError]);

  return (
    <div className='acct_settings_wrapper'>
      <form className='change_pword_form settings_form' onSubmit={handleReset}>
        <fieldset className='form_segment'>
          <legend>Reset Password</legend>

          <button
            className={`spc_btn ${isLogInLoading ? 'loading' : ''}`}
            disabled={isLogInLoading}
          >
            {isLogInLoading ? 'Sending...' : 'Get reset link'}
          </button>
        </fieldset>
      </form>

      <form className='delete_acct settings_form' onSubmit={handleDel}>
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
              placeholder={`Enter Username (${userInfo?.userName})`}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <button
              className={`delete_btn spc_btn ${
                userName !== userInfo?.userName || delAcc ? 'disable' : ''
              }`}
              disabled={userName !== userInfo?.userName || delAcc}
            >
              {delAcc ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AccountSettings;
