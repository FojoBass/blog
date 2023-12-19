import React, { useEffect, useState, useMemo } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Posts from './UserPosts';
import DisplayUsers from '../components/DisplayUsers';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import BoardSearchLayout, {
  PostInt,
  NavInt,
} from '../../layouts/BoardSearchLayout';
import { useBlogSelector } from '../../app/store';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../../services/firebase/config';

const Dashboard = () => {
  const { isUserLoggedIn, userInfo } = useBlogSelector((state) => state.user);
  const { pathname } = useLocation();
  const [isPosts, setisPosts] = useState<PostInt>({
    status: pathname.split('/').length === 3 ? true : false,
    items: [],
  });
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const navItems = useMemo<NavInt[]>(
    () => [
      { title: 'Posts', count: 3, url: `/${userInfo?.userId}/dashboard/posts` },
      {
        title: 'Followers',
        count: userInfo?.followers.length ?? 0,
        url: `/${userInfo?.userId}/dashboard/followers`,
      },
      {
        title: 'Followings',
        count: userInfo?.followings.length ?? 0,
        url: `/${userInfo?.userId}/dashboard/followings`,
      },
      {
        title: 'Bookmarks',
        count: userInfo?.bookmarks.length ?? 0,
        url: `/${userInfo?.userId}/dashboard/bookmarks`,
      },
    ],
    [userInfo]
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (
      userInfo &&
      pathname.split('/')[pathname.split('/').length - 1] === 'dashboard'
    ) {
      if (!isUserLoggedIn) navigate('/enter', { replace: true });
      else navigate(navItems[0].url);
    }
  }, [isUserLoggedIn, pathname, userInfo]);

  useEffect(() => {
    userInfo &&
      setisPosts({
        status: pathname.split('/')[3] === 'posts' ? true : false,
        items: [
          { count: likes, title: 'Total likes' },
          { count: views, title: 'Total views' },
        ],
      });
  }, [pathname, likes, views, userInfo]);

  useEffect(() => {
    let unsubLikes: () => void;
    let unsubViews: () => void;
    if (auth.currentUser) {
      const likesQuery = query(
        collection(db, `users/${auth.currentUser?.uid ?? ''}/likes`)
      );
      const viewsQuery = query(
        collection(db, `users/${auth.currentUser?.uid ?? ''}/views`)
      );

      unsubLikes = onSnapshot(likesQuery, (querySnapshot) => {
        setLikes(querySnapshot.size);
      });

      unsubViews = onSnapshot(viewsQuery, (querySnapshot) => {
        setViews(querySnapshot.size);
      });
    }

    return () => {
      unsubLikes && unsubLikes();
      unsubViews && unsubViews();
    };
  }, [auth.currentUser]);

  return (
    <>
      {isUserLoggedIn && userInfo ? (
        <BoardSearchLayout
          isPosts={isPosts}
          heading={`Dashboard >> ${pathname.split('/')[3]}`}
          navItems={navItems}
          modClass='dashboard'
          isSearch={false}
          isSettings={false}
          isDashboard={true}
        />
      ) : (
        <div className='loader'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </>
  );
};

export default Dashboard;
export { Posts, DisplayUsers };
