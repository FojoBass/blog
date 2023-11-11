// todo Check profile to enable/disable bookmarks
// todo Functionality to ensure bookmark icons change based on bookmarked status
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthorInfo from './AuthorInfo';
import { BsBookmarkPlus, BsBookmarkDashFill } from 'react-icons/bs';
import { FollowsInt } from '../../types';
import { useBlogSelector } from '../../app/store';
import { BlogServices } from '../../services/firebase/blogServices';
import { toast } from 'react-toastify';

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

  const { userInfo } = useBlogSelector((state) => state.user);
  const blogServices = new BlogServices();

  const handleAddBk = async () => {
    const bkmList = [...bookmarks];
    if (!bkmList.find((bm) => bm === userInfo?.uid)) {
      bkmList.push(userInfo?.uid ?? '');
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
  };

  const handleRemoveBk = () => {
    console.log('Remove Bookmark');
    // TODO THIS NEEDS ITS CODES
    // TODO FOR SOME REASONS, BOOKMARKS ALSO GET LOCALLY UPDATED. CHECK homePosts PRE AND POST BOOKMARK TO ENUSRE IT IS CONSISTENT.
    // TODO ALSO, FIX UP FOLLOWERS IN POST DATA. COME UP WITH THE MOST EFFICIENT WAY OF ACCESSING FOLLOWERS IN USERINFO FROM POST
    // TODO BE GOOD FUTURE ME 🤗🤗
  };

  useEffect(() => {
    if (uid === userInfo?.uid) setIsUser(true);
    if (bookmarks.find((bm) => bm === userInfo?.uid)) setIsBookmarked(true);
  }, [uid, userInfo, bookmarks]);

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
              followersCount={followersCount}
              uid={uid}
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
          <div className='bottom_left'>
            <span className='created_at'>
              {modDate.day} {modDate.month}, {modDate.year}
            </span>
            {category.map((categ, index) => (
              <Link className='category' to='/categories/dummy' key={index}>
                {categ}
              </Link>
            ))}
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
      </div>
      <Link to={`/${uid}/${id}`} className='img_wrapper'>
        <img src={postImgUrl} alt='' />
      </Link>
    </article>
  );
};

export default SinglePost;
