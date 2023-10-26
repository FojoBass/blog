import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Posts from './UserPosts';
import DisplayUsers from '../components/DisplayUsers';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import BoardSearchLayout, {
  PostInt,
  NavInt,
} from '../../layouts/BoardSearchLayout';
import { useBlogSelector } from '../../app/store';

const Dashboard = () => {
  const { isUserLoggedIn, userInfo } = useBlogSelector((state) => state.user);
  const { pathname } = useLocation();
  const [isPosts, setisPosts] = useState<PostInt>({
    status: pathname.split('/').length === 3 ? true : false,
    items: [],
  });
  const [navItems] = useState<NavInt[]>([
    { title: 'Posts', count: 3, url: `/${userInfo?.userId}/dashboard/posts` },
    {
      title: 'Followers',
      count: 5,
      url: `/${userInfo?.userId}/dashboard/followers`,
    },
    {
      title: 'Followings',
      count: 6,
      url: `/${userInfo?.userId}/dashboard/followings`,
    },
    {
      title: 'Bookmarks',
      count: 2,
      url: `/${userInfo?.userId}/dashboard/bookmarks`,
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) navigate('/enter', { replace: true });
    else navigate('/dummies/dashboard/posts');
  }, [isUserLoggedIn]);

  useEffect(() => {
    setisPosts({
      status: pathname.split('/')[3] === 'posts' ? true : false,
      items: [
        { count: 5, title: 'Total likes' },
        { count: 3, title: 'Total views' },
      ],
    });
  }, [pathname]);

  return (
    <>
      {isUserLoggedIn && (
        <BoardSearchLayout
          isPosts={isPosts}
          heading={`Dashboard >> ${pathname.split('/')[3]}`}
          navItems={navItems}
          modClass='dashboard'
          isSearch={false}
          isSettings={false}
        />
      )}
    </>
  );
};

export default Dashboard;
export { Posts, DisplayUsers };
