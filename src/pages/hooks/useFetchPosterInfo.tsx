import React, { useEffect, useState } from 'react';
import { UserInfoInt } from '../../types';
import { BlogServices } from '../../services/firebase/blogServices';

const useFetchPosterInfo = (uid: string) => {
  const [posterInfo, setPosterInfo] = useState<UserInfoInt | null>(null);
  const blogServices = new BlogServices();

  const fetchPosterInfo = async () => {
    if (uid) {
      const res = await blogServices.getUserInfo(uid);
      const data: any = res.data();
      setPosterInfo({ ...data, createdAt: data.createdAt.toDate().toString() });
    } else console.log('Issue with uid: ', { uid });
  };

  useEffect(() => {
    fetchPosterInfo();
  }, [uid]);

  return posterInfo;
};

export default useFetchPosterInfo;
