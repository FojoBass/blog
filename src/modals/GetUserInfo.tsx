import React from 'react';
import InfoForm from '../pages/components/InfoForm';
import { useBlogSelector } from '../app/store';

const GetUserInfo = () => {
  const { isSignedUp, isSignupLoading } = useBlogSelector(
    (state) => state.user
  );
  return (
    <section id='get_user_info_sect'>
      <InfoForm type={'get_info'} loading={isSignupLoading} />
    </section>
  );
};

export default GetUserInfo;
