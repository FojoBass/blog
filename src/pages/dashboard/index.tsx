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
  const { isUserLoggedIn } = useBlogSelector((state) => state.user);
  const { pathname } = useLocation();
  const [isPosts, setisPosts] = useState<PostInt>({
    status: pathname.split('/').length === 3 ? true : false,
    items: [],
  });
  const [navItems] = useState<NavInt[]>([
    { title: 'Posts', count: 3, url: '/dummies/dashboard/posts' },
    { title: 'Followers', count: 5, url: '/dummies/dashboard/followers' },
    { title: 'Followings', count: 6, url: '/dummies/dashboard/followings' },
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
          heading={'Dashboard'}
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
