import React, { useState, useEffect } from 'react';
import { BlogServices } from '../services/firebase/blogServices';
import { useBlogSelector, useBlogDispatch } from '../app/store';
import { useGlobalContext } from '../context';
import { userSlice } from '../features/userSlice';
import { StorageFuncs } from '../services/storages';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../services/firebase/config';
import { User } from 'firebase/auth';

const Verification = () => {
  const { isVerifyOpen, setIsVerifyOpen, logOut } = useGlobalContext();
  const navigate = useNavigate();
  const dispatch = useBlogDispatch();

  const { setNoUserInfo } = userSlice.actions;

  const [counter, setCounter] = useState(0);
  const [startCounter, setStartCounter] = useState(false);

  const handleSignout = async () => {
    try {
      logOut && logOut();
      dispatch(setNoUserInfo(false));
      navigate('/');
      setIsVerifyOpen && setIsVerifyOpen(false);
      setCounter(0);
      setStartCounter(false);
    } catch (error) {}
  };

  const handleVerify = async () => {
    setStartCounter(true);
    try {
      await new BlogServices().verification(auth.currentUser as User);
      toast.success('Verification link sent to email');
    } catch (error) {
      toast.error('Verification link not sent, try again!');
    }
  };

  useEffect(() => {
    let countInterval: NodeJS.Timer;
    if (startCounter) {
      let count = 60;
      countInterval = setInterval(() => {
        if (count < 0) {
          clearInterval(countInterval);
          setStartCounter(false);
        } else setCounter(count--);
      }, 1000);
    }

    return () => clearInterval(countInterval);
  }, [startCounter]);

  return (
    <section id='verify_sect' style={!isVerifyOpen ? { display: 'none' } : {}}>
      <div className='center_sect'>
        <h2>Email Verification</h2>
        <p>Verify Email to continue. This will not take long</p>
        <div className='btn_wrapper'>
          <button
            className='verify_btn spc_btn'
            disabled={counter > 0}
            style={counter > 0 ? { cursor: 'not-allowed' } : {}}
            onClick={handleVerify}
          >
            Verify
            <span
              className='counter'
              style={counter < 1 ? { display: 'none' } : {}}
            >
              {counter}s
            </span>
          </button>
          <button className='log_out_btn' onClick={handleSignout}>
            Log out
          </button>
        </div>
      </div>
    </section>
  );
};

export default Verification;
