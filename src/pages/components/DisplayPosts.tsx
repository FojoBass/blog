import React, { useState, useEffect } from 'react';
import { SkeletonLoad, SinglePost } from './index';
import dummyImg from '../../assets/Me cropped.jpg';
import { DummyPostsInt } from '../../types';

interface PropInt {
  posts: DummyPostsInt[];
}

const DisplayPosts: React.FC<PropInt> = ({ posts }) => {
  // ! The array to contain loaded home page posts will first contain dummy posts, which will be replaced with the fetched posts
  // ! All posts are thus to have a 'isDummy' property.
  // ! For dummy posts, display 'SkeletonLoad.jsx'
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
    <>
      {isFakeLoading ? (
        <main className='main_side'>
          {posts.map(
            (post) =>
              post.isDummy && (
                <div key={post.id}>
                  <SkeletonLoad />
                </div>
              )
          )}
          <button className='load_more_btn'>Load more</button>
        </main>
      ) : (
        <main className='main_side'>
          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <SinglePost
            posterName={'Olubo Fosimubo'}
            avi={dummyImg}
            title={'Lorem ipsum dolor sit amet consectetur.'}
            detail={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quibusdam minima veritatis ratione optio illo, iste velit
                    aliquam debitis consequuntur? Quis atque optio voluptatum
                    numquam repellendus fugiat distinctio commodi quidem.
                    Quod?...`}
            date={'Feb 17'}
            category={'Category'}
            postImgUrl={dummyImg}
            id={'asdf'}
            followersCount={5}
            aboutPoster={
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus, quisquam.'
            }
          />

          <button className='load_more_btn'>Load more</button>
        </main>
      )}
    </>
  );
};

export default DisplayPosts;
