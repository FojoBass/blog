import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthorInfo from './AuthorInfo';
import { BsBookmarkPlus, BsBookmarkDashFill } from 'react-icons/bs';
import { BookmarkInt, FollowsInt } from '../../types';
import { useBlogDispatch, useBlogSelector } from '../../app/store';
import { BlogServices } from '../../services/firebase/blogServices';
import { toast } from 'react-toastify';
import { addFollow } from '../../features/userAsyncThunk';

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
  isHome?: boolean;
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
  isHome,
}) => {
  const [isUser, setIsUser] = useState(false);
  const [modDate] = useState({
    day: date?.split(' ')[2],
    month: date?.split(' ')[1],
    year: date?.split(' ')[3],
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBkmLoading, setIsBkmLoading] = useState(false);

  const { userInfo, isUserLoggedIn } = useBlogSelector((state) => state.user);
  const blogServices = new BlogServices();
  const navigate = useNavigate();
  const [bkms, setBkms] = useState(bookmarks);
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useBlogDispatch();
  const { followLoading } = useBlogSelector((state) => state.user);

  const handleAddBk = async () => {
    if (isUserLoggedIn) {
      const bkmList = [...bookmarks];
      let userBkms: BookmarkInt[] = [...(userInfo?.bookmarks ?? [])];
      if (!bkmList?.find((bm) => bm === userInfo?.uid)) {
        bkmList.push(userInfo?.uid ?? '');
        userBkms.push({ postId: id, uid });

        setBkms(bkmList);
        try {
          setIsBkmLoading(true);
          await blogServices.updatePost({ bookmarks: bkmList }, id, true, uid);
          await blogServices.updatePost({ bookmarks: bkmList }, id, false, uid);
          await blogServices.updateBookmarks(userInfo?.uid ?? '', {
            bookmarks: userBkms,
          });
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
      let userBkms: BookmarkInt[] = [];
      if (bkmList?.find((bm) => bm === userInfo?.uid)) {
        bkmList = bkmList.filter((bm) => bm !== userInfo?.uid);
        setBkms(bkmList);
        userBkms = userBkms.filter((bkm) => bkm.postId !== id);

        try {
          setIsBkmLoading(true);
          await blogServices.updatePost({ bookmarks: bkmList }, id, true, uid);
          await blogServices.updatePost({ bookmarks: bkmList }, id, false, uid);
          await blogServices.updateBookmarks(userInfo?.uid ?? '', {
            bookmarks: userBkms,
          });
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
      dispatch(addFollow({ isFollow, posterName, uid, avi }));
    } else {
      navigate('/enter');
    }
  };

  useEffect(() => {
    if (uid === userInfo?.uid) setIsUser(true);

    if (userInfo?.followings?.find((flw) => flw.id === uid)) setIsFollow(true);
    else setIsFollow(false);

    if (bkms?.find((bm) => bm === userInfo?.uid)) setIsBookmarked(true);
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
                    className={`bkmark_btn active ${
                      isBkmLoading ? 'disable' : ''
                    }`}
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
