import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Posts from './UserPosts';
import Follows from './Follows';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const { pathname } = useLocation();
  const [isPosts, setisPosts] = useState(
    pathname.split('/').length === 3 ? true : false
  );
  const navigate = useNavigate();

  useEffect(() => {
    setisPosts(pathname.split('/')[3] === 'posts' ? true : false);
  }, [pathname]);

  useEffect(() => {
    navigate('/dummies/dashboard/posts');
  }, []);

  return (
    <section id='dashboard_sect'>
      <div className='center_sect'>
        <h1>Dashboard</h1>

        <div className='dash_nav'>
          <NavLink to='/dummies/dashboard/posts' className='nav_opt'>
            Posts (3)
          </NavLink>
          <NavLink to='/dummies/dashboard/followers' className='nav_opt'>
            Followers (5)
          </NavLink>
          <NavLink to='/dummies/dashboard/followings' className='nav_opt'>
            Followings (6)
          </NavLink>
        </div>

        {isPosts && (
          <div className='dash_boxes'>
            <article className='dash_box'>
              <span className='count'>5</span>Total likes
            </article>

            <article className='dash_box'>
              <span className='count'>3</span>Total views
            </article>
          </div>
        )}

        <main>
          <aside className='side_dash_nav_wrapper'>
            <NavLink to='/dummies/dashboard/posts' className='side_dash_nav'>
              Posts <span>(3)</span>
            </NavLink>
            <NavLink
              to='/dummies/dashboard/followers'
              className='side_dash_nav'
            >
              Followers <span>(5)</span>
            </NavLink>
            <NavLink
              to='/dummies/dashboard/followings'
              className='side_dash_nav'
            >
              Followings <span>(6)</span>
            </NavLink>
          </aside>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
export { Posts, Follows };
