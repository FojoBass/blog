import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidenavPart from '../components/SidenavPart';
import dummyImg from '../../assets/Me cropped.jpg';
import { CiBookmarkPlus } from 'react-icons/ci';
import AuthorInfo from '../components/AuthorInfo';
import SkeletonLoad from './SkeletonLoad';

export interface HandleStickInt {
  (el: HTMLDivElement, stick: boolean, posValue?: number): void;
}

// TODO IMPLEMNET RESPONSE SCROLL FOR ASIDE
// ! The array to contain loaded home page posts will first contain dummy posts, which will be replaced with the fetched posts
// ! All posts are thus to have a 'isDummy' property.
// ! For dummy posts, display 'SkeletonLoad.jsx'

const Home = () => {
  const asideRef = useRef<HTMLDivElement>(null);
  // TODO JUST A PLACEHOLDER FOR AUTH
  const [isLogged, setIsLogged] = useState(false);
  // TODO Placeholder for loading purposes
  const homePosts = [
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
    { isDummy: true },
  ];
  const [isFakeLoading, setIsFakeLoading] = useState(true);

  useEffect(() => {
    const testTimeout = setTimeout(() => {
      setIsFakeLoading(false);
      clearTimeout(testTimeout);
    }, 3500);

    return () => {
      clearTimeout(testTimeout);
    };
  }, []);

  return (
    <section id='home_sect'>
      <div className='center_sect home_wrapper'>
        <aside className='left_side' ref={asideRef}>
          {!isLogged ? (
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

        {isFakeLoading ? (
          <main className='main_side'>
            {homePosts.map((post, ind) =>
              post.isDummy ? <SkeletonLoad /> : ''
            )}
            <button className='load_more_btn'>Load more</button>
          </main>
        ) : (
          <main className='main_side'>
            <article className='single_post'>
              <div className='post_wrapper'>
                <div className='top'>
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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
                  <div className='top_child'>
                    <Link className='img_wrapper' to='/p/dummyUser'>
                      <img src={dummyImg} alt='' />
                    </Link>
                    <Link to='/p/dummyUser' className='author_name'>
                      Olubo Fosimubo
                    </Link>
                    <AuthorInfo
                      imgUrl={dummyImg}
                      name={'dummy Name'}
                      about={
                        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                      }
                      followersCount={25}
                    />
                  </div>
                </div>

                <div className='mid'>
                  <Link to='/dummyUser/dummyPost' className='title'>
                    Lorem ipsum dolor sit amet consectetur.
                  </Link>
                  <p className='detail'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...
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

            <button className='load_more_btn'>Load more</button>
          </main>
        )}

        {/* <main className='main_side'>
          <article className='single_post'>
            <div className='post_wrapper'>
              <div className='top'>
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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
                <div className='top_child'>
                  <Link className='img_wrapper' to='/p/dummyUser'>
                    <img src={dummyImg} alt='' />
                  </Link>
                  <Link to='/p/dummyUser' className='author_name'>
                    Olubo Fosimubo
                  </Link>
                  <AuthorInfo
                    imgUrl={dummyImg}
                    name={'dummy Name'}
                    about={
                      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
                    }
                    followersCount={25}
                  />
                </div>
              </div>

              <div className='mid'>
                <Link to='/dummyUser/dummyPost' className='title'>
                  Lorem ipsum dolor sit amet consectetur.
                </Link>
                <p className='detail'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam minima veritatis ratione optio illo, iste velit
                  aliquam debitis consequuntur? Quis atque optio voluptatum
                  numquam repellendus fugiat distinctio commodi quidem. Quod?...
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

          <button className='load_more_btn'>Load more</button>
        </main> */}
      </div>
    </section>
  );
};

export default Home;
