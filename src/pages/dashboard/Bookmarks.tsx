import React, { useEffect, useState, useRef } from 'react';
import { useBlogSelector } from '../../app/store';
import { FieldValue } from 'firebase/firestore';
import { BlogServices } from '../../services/firebase/blogServices';
import { BookmarkInt, BookmarksInt, DummyPostsInt } from '../../types';
import { useGlobalContext } from '../../context';
import BookmarksLoading from '../components/BookmarksLoading';
import { Link } from 'react-router-dom';

interface BkmsInt extends BookmarksInt {
  isDummy: false;
}

const Bookmarks = () => {
  const { userInfo } = useBlogSelector((state) => state.user);
  const { skeletonPosts } = useGlobalContext();
  const [isBkmLoading, setIsBkmLoading] = useState(true);
  const [bookmarks, setBoookmarks] = useState<BkmsInt[] | DummyPostsInt[]>([
    ...(skeletonPosts ?? []),
  ]);
  const blogServices = new BlogServices();
  const [fetchStop, setFetchStop] = useState(0);
  const fetchCount = useRef(5);

  const fetchBookmarks = async (userBkms: BookmarkInt[]) => {
    let modBkms: BkmsInt[] = bookmarks.filter(
      (bkm) => !bkm.isDummy
    ) as BkmsInt[];
    try {
      isBkmLoading || setIsBkmLoading(true);
      for (let i = fetchStop; i < fetchCount.current + fetchStop; i++) {
        if (i === userBkms.length) {
          setFetchStop(i);
          break;
        }

        const postRes = (await blogServices.getPost(userBkms[i].postId)).data();
        const infoRes = (
          await blogServices.getUserInfo(userBkms[i].uid)
        ).data();

        const data: any = {
          aviUrl: infoRes ? infoRes.aviUrls.smallAviUrl : '',
          title: postRes ? postRes.title : '',
          uid: infoRes ? infoRes.uid : '',
          postId: postRes ? postRes.postId : '',
          publishedAt: postRes ? postRes.publishedAt.toDate().toString() : '',
          author: postRes ? postRes.author : '',
          categs: postRes ? postRes.selCategs : [],
          isDummy: false,
        };

        modBkms.push(data as BkmsInt);
        if (i === fetchStop + fetchCount.current - 1) setFetchStop(i + 1);
      }
      setBoookmarks(modBkms);
    } catch (error) {
    } finally {
      setIsBkmLoading(false);
    }
  };

  const handleLoadMore = () => {
    const userBkms = [...(userInfo?.bookmarks ?? [])];
    setBoookmarks((prev) => [...prev, ...skeletonPosts!]);
    if (userBkms.length) fetchBookmarks(userBkms);
  };

  useEffect(() => {
    const userBkms = [...(userInfo?.bookmarks ?? [])];
    if (userBkms.length) fetchBookmarks(userBkms);
    else {
      setIsBkmLoading(false);
      setBoookmarks([]);
    }
  }, []);

  return (
    <section className='bookmark_sect'>
      {bookmarks.length ? (
        <>
          {bookmarks.map((bkm) =>
            bkm.isDummy ? (
              <BookmarksLoading key={bkm.postId} />
            ) : (
              <article className='card_wrapper' key={bkm.postId}>
                <Link
                  to={`/p/${(bkm as BookmarksInt).uid}`}
                  className='img_wrapper'
                >
                  <img src={(bkm as BkmsInt).aviUrl} alt='author img' />
                </Link>

                <div className='post_side'>
                  <Link
                    to={`/${(bkm as BookmarksInt).uid}/${
                      (bkm as BookmarksInt).postId
                    }`}
                    className='title'
                  >
                    {(bkm as BkmsInt).title}
                  </Link>

                  <div className='bottom'>
                    <Link
                      to={`/p/${(bkm as BookmarksInt).uid}`}
                      className='author'
                    >
                      {(bkm as BkmsInt).author}
                    </Link>
                    <span className='date_wrapper'>
                      {((bkm as BkmsInt).publishedAt as string).split(' ')[1]}{' '}
                      {((bkm as BkmsInt).publishedAt as string).split(' ')[2]}
                    </span>

                    <div className='categ_wrapper'>
                      {(bkm as BkmsInt).categs.map((categ) => (
                        <Link to='/' className='category'>
                          {categ}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
          <button
            className={`load_more_btn ${
              isBkmLoading || userInfo?.bookmarks.length === fetchStop
                ? 'disable'
                : ''
            }`}
            disabled={isBkmLoading || userInfo?.bookmarks.length === fetchStop}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </>
      ) : (
        <h3 className='empty_data'>No bookmarks</h3>
      )}
    </section>
  );
};

export default Bookmarks;
