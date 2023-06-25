import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useBlogSelector, useBlogDispatch } from '../../app/store';
import { blogSlice } from '../../features/blogSlice';
import SidenavPart from './SidenavPart';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';

const Sidenav = () => {
  const { isOpenSideNav } = useBlogSelector((state) => state.blog);
  const dispatch = useBlogDispatch();
  const { handleSideNav } = blogSlice.actions;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget.children[0]) {
      dispatch(handleSideNav());
    }
  };
  const { isUserLogged } = useGlobalContext();

  return (
    <section
      className={isOpenSideNav ? 'side_nav_sect active' : 'side_nav_sect'}
      onClick={handleClose}
    >
      <aside className={isOpenSideNav ? 'side_nav active' : 'side_nav'}>
        <h3 className='heading'>
          Lorem{' '}
          <button className='close_btn'>
            <AiOutlineClose />
          </button>
        </h3>

        {!isUserLogged ? (
          <div className='not_logged_sect'>
            <h3>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis,
              cum?
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              aspernatur sint quae labore, quis voluptas.
            </p>

            <div className='btns_wrapper'>
              <Link to='/join' className='create_acct_btn'>
                Create account
              </Link>
              <Link to='/enter' className='login_btn'>
                Log in
              </Link>
            </div>
          </div>
        ) : (
          ''
        )}

        <SidenavPart />
      </aside>
    </section>
  );
};

export default Sidenav;
