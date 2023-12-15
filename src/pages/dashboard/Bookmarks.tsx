import React, { useEffect, useState } from 'react';
import { useBlogSelector } from '../../app/store';
import { FieldValue } from 'firebase/firestore';
import { BlogServices } from '../../services/firebase/blogServices';
import { BookmarksInt, DummyPostsInt } from '../../types';
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

  useEffect(() => {
    const userBkms = [...(userInfo?.bookmarks ?? [])];
    if (userBkms.length) {
      (async () => {
        let modBkms: BkmsInt[] = [];
        try {
          for (let i = 0; i < userBkms.length; i++) {
            const postRes = (
              await blogServices.getPost(userBkms[i].postId)
            ).data();
            const infoRes = (
              await blogServices.getUserInfo(userBkms[i].uid)
            ).data();

            const data: any = {
              aviUrl: infoRes ? infoRes.aviUrls.smallAviUrl : '',
              title: postRes ? postRes.title : '',
              uid: infoRes ? infoRes.uid : '',
              postId: postRes ? postRes.postId : '',
              publishedAt: postRes
                ? postRes.publishedAt.toDate().toString()
                : '',
              author: postRes ? postRes.author : '',
              categs: postRes ? postRes.selCategs : [],
              isDummy: false,
            };

            modBkms.push(data as BkmsInt);
          }
          setBoookmarks(modBkms);
        } catch (error) {
          console.log('Bookmark fetching failed');
        } finally {
          setIsBkmLoading(false);
        }
      })();
    } else setIsBkmLoading(false);
  }, []);

  return (
    <section className='bookmark_sect'>
      {bookmarks.map((bkm) =>
        bkm.isDummy ? (
          <BookmarksLoading />
        ) : (
          <article className='card_wrapper' key={bkm.postId}>
            <Link to='' className='img_wrapper'>
              <img src={(bkm as BkmsInt).aviUrl} alt='author img' />
            </Link>

            <div className='post_side'>
              <Link to='' className='title'>
                {(bkm as BkmsInt).title}
              </Link>

              <div className='bottom'>
                <Link to='' className='author'>
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
    </section>
  );
};

export default Bookmarks;

// Todo Style Bookmark loading
//  Todo Style Bookmark cards
// Todo Ensure all links are valid
// Todo Add a Load more btn
