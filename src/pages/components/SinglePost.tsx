// todo Check profile to enable/disable bookmarks
// todo Functionality to ensure bookmark icons change based on bookmarked status
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthorInfo from './AuthorInfo';
import { BsBookmarkPlus, BsBookmarkDashFill } from 'react-icons/bs';
import { FollowsInt } from '../../types';
import { useBlogSelector } from '../../app/store';
import { BlogServices } from '../../services/firebase/blogServices';
import { toast } from 'react-toastify';
import { followsHandler } from '../../helpers/followsHandler';

export interface SinglePostProps {
  posterName: string;
  avi: string;
  title: string;
  detail: string;
  date: string;
  category: string[];
  postImgUrl: string;
  id: string;
  followersCount: FollowsInt[];
  aboutPoster: string;
  uid: string;
  bookmarks: string[];
}

const SinglePost: React.FC<SinglePostProps> = ({
  posterName,
  avi,
  title,
  detail,
  date,
  category,
  postImgUrl,
  id,
  followersCount,
  aboutPoster,
  uid,
  bookmarks,
}) => {
  const [isUser, setIsUser] = useState(false);
  const [modDate] = useState({
    day: date.split(' ')[2],
    month: date.split(' ')[1],
    year: date.split(' ')[3],
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBkmLoading, setIsBkmLoading] = useState(false);

  const { userInfo, isUserLoggedIn } = useBlogSelector((state) => state.user);
  const blogServices = new BlogServices();
  const navigate = useNavigate();
  const [bkms, setBkms] = useState(bookmarks);
  const [isFollow, setIsFollow] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const handleAddBk = async () => {
    if (isUserLoggedIn) {
      const bkmList = [...bookmarks];
      if (!bkmList.find((bm) => bm === userInfo?.uid)) {
        bkmList.push(userInfo?.uid ?? '');

        setBkms(bkmList);
        try {
          setIsBkmLoading(true);
          await blogServices.updatePost({ bookmarks: bkmList }, id, true, uid);
          await blogServices.updatePost({ bookmarks: bkmList }, id, false, uid);
        } catch (error) {
          toast.error('Bookmarking failed');
          console.log('Bookmark add error: ', error);
        } finally {
          setIsBkmLoading(false);
        }
      }
    } else {
      navigate('/enter');
    }
  };

  const handleRemoveBk = async () => {
    if (isUserLoggedIn) {
      let bkmList = [...bookmarks];
      if (bkmList.find((bm) => bm === userInfo?.uid)) {
        bkmList = bkmList.filter((bm) => bm !== userInfo?.uid);
        setBkms(bkmList);

        try {
          setIsBkmLoading(true);
          await blogServices.updatePost({ bookmarks: bkmList }, id, true, uid);
          await blogServices.updatePost({ bookmarks: bkmList }, id, false, uid);
        } catch (error) {
          toast.error('Bookmark remove failed');
          console.log('Bookmark remove error: ', error);
        } finally {
          setIsBkmLoading(false);
        }
      }
    } else {
      navigate('/enter');
    }
  };

  const handleFollow = async () => {
    if (isUserLoggedIn) {
      try {
        setFollowLoading(true);
        const info = await blogServices.getUserInfo(uid);
        let followers = info.data()!.followers as FollowsInt[];

        followsHandler(userInfo!, followers, isFollow, {
          posterName,
          uid,
          avi,
        });
      } catch (error: any) {
        if (error.message.includes('Already a follower'))
          toast.error(error.message);
        if (error.message.includes('Not a follower'))
          toast.error(error.message);
        if (error.message.includes('offline'))
          toast.error('Check internet connection');
        else toast.error('Following failed');
        console.log('UserInfo fetch error: ', error);
      } finally {
        setFollowLoading(false);
      }
    } else {
      navigate('/enter');
    }
  };

  useEffect(() => {
    if (uid === userInfo?.uid) setIsUser(true);

    if (userInfo?.followings.find((flw) => flw.id === uid)) setIsFollow(true);
    else setIsFollow(false);

    if (bkms.find((bm) => bm === userInfo?.uid)) setIsBookmarked(true);
    else setIsBookmarked(false);
  }, [uid, userInfo, bkms]);

  return (
    <article className='single_post'>
      <div className='post_wrapper'>
        <div className='top'>
          <div className='top_child'>
            <Link className='img_wrapper' to={`/p/${uid}`}>
              <img src={avi} alt='' />
            </Link>
            <Link to={`/p/${uid}`} className='author_name'>
              {posterName}
            </Link>
            <AuthorInfo
              imgUrl={avi}
              name={posterName}
              about={aboutPoster}
              isFollow={isFollow}
              uid={uid}
              handleFollow={handleFollow}
              followLoading={followLoading}
              isUser={isUser}
            />
          </div>
        </div>

        <div className='mid'>
          <Link to={`/${uid}/${id}`} className='title'>
            {title}
          </Link>
          <p className='detail'>{detail}</p>
        </div>

        <div className='bottom'>
          <div className='bottom_top'>
            <div className='bottom_left'>
              <span className='created_at'>
                {modDate.day} {modDate.month}, {modDate.year}
              </span>
            </div>

            {isUser || (
              <div className='bottom_right'>
                {isBookmarked ? (
                  <button
                    className={`bkmark_btn ${isBkmLoading ? 'disable' : ''}`}
                    disabled={isBkmLoading}
                    onClick={handleRemoveBk}
                    title='Remove bookmark'
                  >
                    <BsBookmarkDashFill />
                  </button>
                ) : (
                  <button
                    className={`bkmark_btn ${isBkmLoading ? 'disable' : ''}`}
                    disabled={isBkmLoading}
                    onClick={handleAddBk}
                    title='Add bookmark'
                  >
                    <BsBookmarkPlus />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className='bottom_bottom'>
            {category.map((categ, index) => (
              <Link className='category' to='/categories/dummy' key={index}>
                {categ}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Link to={`/${uid}/${id}`} className='img_wrapper'>
        <img src={postImgUrl} alt='' />
      </Link>
    </article>
  );
};

export default SinglePost;
