import React from 'react';
import InfoForm from '../pages/components/InfoForm';

const GetUserInfo = () => {
  return (
    <section id='get_user_info_sect'>
      <InfoForm type={'get_info'} loading={false} />
    </section>
  );
};

export default GetUserInfo;
