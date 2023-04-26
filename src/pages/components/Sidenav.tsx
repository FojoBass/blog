import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useBlogSelector, useBlogDispatch } from '../../app/store';
import { blogSlice } from '../../features/blogSlice';
import SidenavPart from './SidenavPart';

const Sidenav = () => {
  const { isOpenSideNav } = useBlogSelector((state) => state.blog);
  const dispatch = useBlogDispatch();
  const { handeSideNav } = blogSlice.actions;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget.children[0]) {
      dispatch(handeSideNav());
    }
  };

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

        <SidenavPart />
      </aside>
    </section>
  );
};

export default Sidenav;
