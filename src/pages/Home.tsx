import React from 'react';
import { Link } from 'react-router-dom';
import SidenavPart from './components/SidenavPart';
import dummyImg from '../assets/Me cropped.jpg';
import { CiBookmarkPlus } from 'react-icons/ci';

const Home = () => {
  return (
    <section id='home_sect'>
      <div className='center_sect'>
        <aside className='left_side'>
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

            <SidenavPart />
          </div>
        </aside>

        <main className='main_side'>
          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>

            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <Link to='/p/dummyUser' className='img_wrapper'>
                  <img src={dummyImg} />
                </Link>
                <Link to='/p/dummyUser' className='author_name'>
                  jane doe
                  <div className='author_info'>FIX THIS UP BRUFFFF!!!</div>
                </Link>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus quam eveniet aut facilis?...
                </p>
              </div>

              <div className='bottom'>
                <div className='bottom_left'>
                  <span className='created_at'>Feb 17</span>
                  <Link className='category' to='/categories/dummy'>
                    Category
                  </Link>
                </div>

                <div className='bottom_right'>
                  <button className='bkmark_btn'>
                    <CiBookmarkPlus />
                  </button>
                </div>
              </div>
            </div>
            <Link to='/dummyUser/dummyPost' className='img_wrapper'>
              <img src={dummyImg} alt='' />
            </Link>
          </article>

          <button className='load_more_btn'>Load more stories</button>
        </main>
      </div>
    </section>
  );
};

export default Home;
