import React, { useEffect, useState } from 'react';
import { UserInfoInt } from '../../types';
import { BlogServices } from '../../services/firebase/blogServices';

const useFetchPosterInfo = (uid: string) => {
  const [posterInfo, setPosterInfo] = useState<UserInfoInt | null>(null);
  const blogServices = new BlogServices();

  const fetchPosterInfo = async () => {
    if (uid) {
      try {
        const res = await blogServices.getUserInfo(uid);
        const data: any = res.data();
        setPosterInfo({
          ...data,
          createdAt: data.createdAt.toDate().toString(),
        });
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchPosterInfo();
  }, [uid]);

  return posterInfo;
};

export default useFetchPosterInfo;
