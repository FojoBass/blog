import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
  FC,
} from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';
import { BsFileImage } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { resizeImg } from '../helpers/imgResize';
import { useBlogSelector, useBlogDispatch } from '../app/store';
import { BlogServices } from '../services/firebase/blogServices';
import { v4 } from 'uuid';
import { getDownloadURL } from 'firebase/storage';
import { blogSlice } from '../features/blogSlice';
import MainPost from './components/MainPost';
import { handleParsePost } from '../helpers/handleParsePost';
import ShortUniqueId from 'short-unique-id';
import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';
import { addPosts } from '../features/blogAsyncThunk';
import { PostInt } from '../types';
import { auth } from '../services/firebase/config';

interface EditorFuncInt {
  (
    symbol: string,
    startPos: number,
    endPos: number,
    block?: boolean,
    type?: string
  ): void;
}

interface NewPostInt {
  postMain: string;
  bannerUrl: string;
  postTitle: string;
}

enum OpEnum {
  pub = 'publish',
  sav = 'save',
}

const NewPost = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState('');
  const [bannerImgFile, setBannerImgFile] = useState<null | File>(null);
  const [isUploadingBannerImg, setIsUploadingBannerImg] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);
  const blogTheme = useBlogSelector((state) => state.theme);
  const [isBannerResizing, setIsBannerResizing] = useState(false);
  const [isBannerReady, setIsBannerReady] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postMain, setPostMain] = useState('');
  const [isPostImgReady, setIsPostImgReady] = useState(false);
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [postImgFile, setPostImgFile] = useState<null | File>(null);
  const [postImgUrl, setPostImgUrl] = useState('');
  const [post, setPost] = useState<NewPostInt>({
    postMain,
    bannerUrl,
    postTitle,
  });
  const [parsedPost, setParsedPost] = useState('');
  const [isPubClicked, setIsPubClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postMainRef = useRef<HTMLTextAreaElement>(null);

  const postId = useRef(new ShortUniqueId({ length: 10 }).rnd());

  const dispatch = useBlogDispatch();
  const { uploading, uploadingFailed, uploadingSucceed, userPosts } =
    useBlogSelector((state) => state.blog);
  const { isUserLoggedIn, userInfo } = useBlogSelector((state) => state.user);
  const { resetProp, setPosts } = blogSlice.actions;

  const [selCategs, setSelCategs] = useState<string[]>([]);
  const [desc, setDesc] = useState('');
  const [dataPost, setDataPost] = useState<PostInt | null>(null);

  const handleBannerFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (imgFile) {
      setIsBannerResizing(true);
      try {
        const bannerImg = await resizeImg(imgFile, blogTheme, 800, 0.7);
        if (typeof bannerImg !== 'string') {
          setBannerImgFile(bannerImg.finalFile);
          setIsBannerReady(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsBannerResizing(false);
      }
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.[0]) {
      const imgFile = e.target.files[0];

      if (imgFile) {
        setIsPostImgReady(true);
        try {
          const postImg = await resizeImg(imgFile, blogTheme, 800, 0.7);
          if (typeof postImg !== 'string') {
            setPostImgFile(postImg.finalFile);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleRemove = (e: MouseEvent) => {
    if (bannerInputRef.current) {
      bannerInputRef.current.value = '';
      setBannerImgFile(null);
      setBannerUrl('');
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostTitle(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFormating = (action: string, symbol: string): void => {
    const el = postMainRef.current;
    if (el) {
      const cursorStartPosition = el.selectionStart;
      const cursorEndPosition = el.selectionEnd;

      switch (action) {
        case 'B':
          if (!checker(symbol, cursorStartPosition, cursorEndPosition))
            inserter(symbol, cursorStartPosition, cursorEndPosition);
          else remover(symbol, cursorStartPosition, cursorEndPosition);
          break;
        case 'I':
          if (!checker(symbol, cursorStartPosition, cursorEndPosition))
            inserter(symbol, cursorStartPosition, cursorEndPosition);
          else remover(symbol, cursorStartPosition, cursorEndPosition);
          break;
        case 'S':
          if (!checker(symbol, cursorStartPosition, cursorEndPosition))
            inserter(symbol, cursorStartPosition, cursorEndPosition);
          else remover(symbol, cursorStartPosition, cursorEndPosition);
          break;
        case 'U':
          if (!checker(symbol, cursorStartPosition, cursorEndPosition))
            inserter(symbol, cursorStartPosition, cursorEndPosition);
          else remover(symbol, cursorStartPosition, cursorEndPosition);
          break;
        case 'H2':
          if (
            !checker(
              symbol,
              cursorStartPosition,
              cursorEndPosition,
              'general',
              true
            )
          )
            inserter(symbol, cursorStartPosition, cursorEndPosition, true);
          else remover(symbol, cursorStartPosition, cursorEndPosition, true);
          break;
        case 'H3':
          if (
            !checker(
              symbol,
              cursorStartPosition,
              cursorEndPosition,
              'general',
              true
            )
          )
            inserter(symbol, cursorStartPosition, cursorEndPosition, true);
          else remover(symbol, cursorStartPosition, cursorEndPosition, true);
          break;
        case 'L':
          inserter(
            symbol,
            cursorStartPosition,
            cursorEndPosition,
            false,
            'link'
          );
          break;
        case 'Im':
          if (fileInputRef.current) fileInputRef.current.click();
          break;
        default:
          return;
      }
    }
  };

  const checker = (
    symbol: string,
    startPos: number,
    endPos: number,
    type = 'general',
    block = false
  ): boolean =>
    type === 'general'
      ? !block
        ? postMain.slice(startPos - symbol.length, startPos) === symbol &&
          postMain.slice(endPos, endPos + symbol.length) === symbol
        : postMain.slice(startPos - symbol.length, startPos) === symbol
      : false;

  const inserter: EditorFuncInt = (
    symbol,
    startPos,
    endPos,
    block = false,
    type = 'general'
  ) => {
    const modValue =
      type === 'general'
        ? !block
          ? postMain.slice(0, startPos) +
            symbol +
            postMain.slice(startPos, endPos) +
            symbol +
            postMain.slice(endPos)
          : postMain.slice(0, startPos) +
            `${
              startPos === 0
                ? `${symbol}`
                : postMain.slice(startPos - 1) === '\n'
                ? `\n${symbol}`
                : `\n\n${symbol}`
            }` +
            postMain.slice(startPos, endPos) +
            postMain.slice(endPos)
        : type === 'link'
        ? postMain.slice(0, startPos) +
          '[' +
          postMain.slice(startPos, endPos) +
          '](enter url)' +
          postMain.slice(endPos)
        : postMain.slice(0, startPos) +
          `${
            startPos === 0
              ? `!${'[Uploading Image](...)'}`
              : postMain.slice(startPos - 1) === '\n'
              ? `\n!${'[Uploading Image](...)'}`
              : `\n\n!${'[Uploading Image](...)'}`
          }` +
          postMain.slice(startPos, endPos) +
          postMain.slice(endPos);
    setPostMain(modValue);
  };

  const remover: EditorFuncInt = (
    symbol,
    startPos,
    endPos,
    block = false,
    type = 'general'
  ) => {
    let modPost = '';
    if (type === 'general') {
      modPost = !block
        ? postMain.slice(0, startPos - symbol.length) +
          postMain.slice(startPos, endPos) +
          postMain.slice(endPos + symbol.length)
        : postMain.slice(0, startPos - symbol.length) +
          postMain.slice(startPos, endPos) +
          postMain.slice(endPos);
      setPostMain(modPost);
    }
  };

  const uploadImg = (isBanner: boolean, file: File) => {
    if (!isPostImgReady) setIsUploadingBannerImg(true);
    setIsUploadingImg(true);

    const uploadTask = new BlogServices().uploadBannerPostImg(
      auth.currentUser?.uid ?? '',
      postId.current,
      file,
      isBanner
    );

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setBannerUploadProgress(progress);
      },
      (error) => {
        console.log('Banner Upload failed: ', error);
        setIsUploadingBannerImg(false);
        setIsBannerReady(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (isBanner) {
            setBannerUrl(downloadURL);
            setIsUploadingBannerImg(false);
            setIsBannerReady(false);
          } else {
            setPostImgUrl(downloadURL);
            setIsUploadingImg(false);
            setIsPostImgReady(false);
            setPostImgFile(null);
          }
        });
      }
    );
  };

  const handlePost = (op: OpEnum): void => {
    if (bannerUrl && postTitle && postMain) {
      let postData: PostInt;
      switch (op) {
        case 'save':
          postData = {
            userId: userInfo!.userId,
            uid: auth.currentUser?.uid ?? '',
            isDummy: false,
            postId: postId.current,
            post: post.postMain,
            bannerUrl: post.bannerUrl,
            isPublished: false,
            comments: [],
            likes: [],
            bookmarks: [],
            commentsCount: 0,
            createdAt: serverTimestamp(),
            author: userInfo?.userName ?? '',
            aviUrl: userInfo?.aviUrls.smallAviUrl ?? '',
            title: post.postTitle,
            followers: userInfo?.followers ?? [],
            bio: userInfo?.bio ?? '',
          };
          dispatch(addPosts({ data: postData, type: 'save' }));
          break;

        case 'publish':
          postData = {
            userId: userInfo!.userId,
            uid: auth.currentUser?.uid ?? '',
            isDummy: false,
            postId: postId.current,
            post: post.postMain,
            bannerUrl: post.bannerUrl,
            isPublished: true,
            comments: [],
            likes: [],
            bookmarks: [],
            commentsCount: 0,
            publishedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            selCategs,
            desc,
            author: userInfo?.userName ?? '',
            aviUrl: userInfo?.aviUrls.smallAviUrl ?? '',
            title: post.postTitle,
            followers: userInfo?.followers ?? [],
            bio: userInfo?.bio ?? '',
          };
          dispatch(addPosts({ data: postData, type: 'pub' }));
          break;

        default:
          return;
      }

      setDataPost(postData);
    } else {
      if (!bannerUrl) toast.error('Upload banner image!');
      else if (!postTitle) toast.error('Give post a descriptive titile!');
      else toast.error('Post is empty!');
    }
  };

  useEffect(() => {
    if (postImgFile) uploadImg(false, postImgFile);
  }, [postImgFile]);

  useEffect(() => {
    if (!isUploadingImg) {
      if (postMain.includes('[Uploading Image](...)')) {
        setPostMain(
          postMain.replace(
            '[Uploading Image](...)',
            `[Enter Image Description](${postImgUrl})`
          )
        );
      }
    }
  }, [isUploadingImg, postImgUrl]);

  useEffect(() => {
    if (uploadingFailed) {
      toast.error('Uploading Failed!');
      dispatch(resetProp('uploadingFailed'));
      setIsPubClicked(false);
      setDataPost(null);
    }

    if (uploadingSucceed && dataPost) {
      // ! No need for manual additoin of posts to pubPosts, since a listener will be set, and homePost will be updated
      // isPubClicked &&
      //   dispatch(
      //     setPosts({
      //       type: 'pub',
      //       posts: [
      //         ...pubPosts,
      //         { ...dataPost, publishedAt: new Date().toString() },
      //       ],
      //     })
      //   );
      dispatch(
        setPosts([
          ...userPosts,
          {
            ...dataPost,
            createdAt: !dataPost.isPublished ? new Date().toString() : '',
            publishedAt: dataPost.isPublished ? new Date().toString() : '',
          },
        ])
      );

      toast.success(`Post ${isPubClicked ? 'published' : 'saved'}`);

      dispatch(resetProp('uploadingSucceed'));
      navigate(`/${userInfo?.userId}/${dataPost.postId}`);
      setIsPubClicked(false);
      setDataPost(null);
    }
  }, [uploadingFailed, uploadingSucceed, dataPost, isPubClicked]);

  // TODO TEST POST UPLOAD, AND FIX BUGS

  useEffect(() => {
    if (isPostImgReady && postMainRef.current) {
      const el = postMainRef.current;
      const cursorStartPos = el.selectionStart;
      const cursorEndPos = el.selectionEnd;

      inserter('', cursorStartPos, cursorEndPos, true, 'img');
    }
  }, [isPostImgReady, postMainRef]);

  useEffect(() => {
    if (isBannerReady && bannerImgFile) uploadImg(true, bannerImgFile);
  }, [isBannerReady, bannerImgFile]);

  useEffect(() => {
    setPost({ postMain, bannerUrl, postTitle });
  }, [postMain, bannerUrl, postTitle]);

  useEffect(() => {
    setRoute('edit');
  }, []);

  useEffect(() => {
    if (route === 'preview') setParsedPost(handleParsePost(post.postMain));
    if (route === 'edit') setParsedPost('');
  }, [route]);

  useEffect(() => {
    if (!isUserLoggedIn) navigate('/enter', { replace: true });
  }, [isUserLoggedIn]);

  return (
    <section id='editor_sect'>
      {isUserLoggedIn && (
        <>
          <nav className='editor_nav'>
            <div className='left_side_btns'>
              <button
                className={route === 'edit' ? 'active edit_btn' : 'edit_btn'}
                onClick={() => setRoute('edit')}
              >
                Edit
              </button>
              <button
                className={
                  route === 'preview' ? 'active preview_btn' : 'preview_btn'
                }
                onClick={() => setRoute('preview')}
              >
                Preview
              </button>
            </div>

            <button className='close_btn' onClick={() => navigate(-1)}>
              <FaTimes />
            </button>
          </nav>

          <div className='center_sect'>
            <div className='center_content'>
              {route === 'edit' ? (
                <>
                  <header className='editor_head'>
                    <div className='editor_top'>
                      <input
                        type='file'
                        name=''
                        id='select_banner'
                        hidden
                        onChange={handleBannerFileChange}
                        ref={bannerInputRef}
                      />
                      {bannerImgFile ? (
                        isUploadingBannerImg ? (
                          <p className='upload_progress'>
                            <span
                              style={{ width: `${bannerUploadProgress}%` }}
                            ></span>
                            Uploading...
                          </p>
                        ) : (
                          <>
                            <div className='img_wrapper'>
                              <img src={bannerUrl} alt='Banner img' />
                            </div>

                            <div className='img_btns'>
                              <label
                                htmlFor='select_banner'
                                className='change_img_btn'
                              >
                                Change
                              </label>
                              <button
                                className='remove_img_btn'
                                onClick={handleRemove}
                              >
                                Remove
                              </button>
                            </div>
                          </>
                        )
                      ) : (
                        <label
                          className='add_banner_btn'
                          htmlFor='select_banner'
                          style={
                            isBannerResizing ? { pointerEvents: 'none' } : {}
                          }
                        >
                          Add a cover image
                        </label>
                      )}
                    </div>

                    <input
                      type='file'
                      id='editor_img'
                      accept='image/*'
                      hidden
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />

                    <textarea
                      className='post_title'
                      rows={1}
                      placeholder='Post title here...'
                      value={postTitle}
                      onChange={handleTitleChange}
                    ></textarea>
                  </header>

                  <div className='action_btns_wrapper'>
                    <div className='btn_wrapper'>
                      <button
                        className='action_btn bold_btn'
                        onClick={() => handleFormating('B', '**')}
                      >
                        B
                      </button>
                      <ToolTip info={'Bold'} />
                    </div>

                    <div className='btn_wrapper'>
                      <button
                        className='action_btn italize_btn'
                        onClick={() => handleFormating('I', '__')}
                      >
                        <em>I</em>
                      </button>
                      <ToolTip info={'Italicize'} />
                    </div>

                    <div className='btn_wrapper'>
                      <button
                        className='action_btn link_btn'
                        onClick={() => handleFormating('L', '')}
                      >
                        <AiOutlineLink />{' '}
                      </button>
                      <ToolTip info={'Add Link'} />
                    </div>

                    <div className='btn_wrapper'>
                      <button
                        className='action_btn strike_btn'
                        onClick={() => handleFormating('S', '~~')}
                      >
                        <s>S</s>
                      </button>
                      <ToolTip info={'Strikethrough'} />
                    </div>

                    <div className='btn_wrapper'>
                      <button
                        className='action_btn img_btn'
                        onClick={() => handleFormating('Im', '')}
                      >
                        <BsFileImage />
                      </button>
                      <ToolTip info={'Add Image'} />
                    </div>

                    <div className='btn_wrapper'>
                      <button
                        className='action_btn underline_btn'
                        onClick={() => handleFormating('U', '--')}
                      >
                        U
                      </button>
                      <ToolTip info={'Underline'} />
                    </div>

                    <div className='btn_wrapper'>
                      <button
                        className='action_btn big_H'
                        onClick={() => handleFormating('H2', '##')}
                      >
                        H<sub>b</sub>
                      </button>
                      <ToolTip info={'Big Heading'} />
                    </div>

                    <div className='btn_wrapper'>
                      <button
                        className='action_btn small_H'
                        onClick={() => handleFormating('H3', '###')}
                      >
                        H<sub>s</sub>
                      </button>
                      <ToolTip info={'Small Heading'} />
                    </div>
                  </div>

                  <textarea
                    className='post_editor'
                    placeholder='Write your post content here...'
                    value={postMain}
                    onChange={(e) => setPostMain(e.target.value)}
                    ref={postMainRef}
                  ></textarea>
                </>
              ) : (
                <MainPost
                  postInfo={{
                    bannerImgUrl: bannerUrl,
                    title: postTitle ? postTitle : 'Post Title',
                    createdAt: '',
                    userName: '',
                    userAvi: '',
                    category: '',
                    post: parsedPost,
                  }}
                />
              )}
            </div>
          </div>

          <footer className='editor_footer'>
            {uploading ? (
              <button className='publish_btn spc_btn loading' disabled>
                {isPubClicked ? 'Publishing' : 'Saving'}
              </button>
            ) : (
              <>
                <div className='left_side'>
                  <button
                    className='publish_btn spc_btn'
                    onClick={() => {
                      setIsPubClicked(true);
                      setIsModalOpen(true);
                    }}
                  >
                    Publish
                  </button>
                  <button
                    className='save_btn'
                    onClick={() => {
                      setIsPubClicked(false);
                      handlePost(OpEnum.sav);
                    }}
                  >
                    Save
                  </button>
                </div>

                <button className='revert_btn'>Revert</button>
              </>
            )}
          </footer>

          <PubModal
            desc={desc}
            setDesc={setDesc}
            selCategs={selCategs}
            setSelCategs={setSelCategs}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handlePost={handlePost}
          />
        </>
      )}
    </section>
  );
};

interface ToolTipInt {
  info: string;
}

const ToolTip: FC<ToolTipInt> = ({ info }) => (
  <div className='tooltip_wrapper'>{info}</div>
);

export default NewPost;

interface PubModalInt {
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  selCategs: string[];
  setSelCategs: React.Dispatch<React.SetStateAction<string[]>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePost: (op: OpEnum) => void;
}

const PubModal: React.FC<PubModalInt> = ({
  desc,
  setDesc,
  selCategs,
  setSelCategs,
  isModalOpen,
  setIsModalOpen,
  handlePost,
}) => {
  const { categories } = useBlogSelector((state) => state.blog);
  const descRef = useRef<HTMLTextAreaElement | null>(null);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelCategs([...selCategs, e.target.value]);
    else setSelCategs(selCategs.filter((cat) => cat !== e.target.value));
  };

  const handleContinue = () => {
    if (!selCategs.length) toast.info('Select relevant categories');
    else if (!desc.trim()) toast.info('Enter a concise description');
    else {
      handlePost(OpEnum.pub);
      setIsModalOpen(false);
    }
  };

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (descRef.current) {
      descRef.current.style.height = 'auto';
      descRef.current.style.height = descRef.current.scrollHeight + 'px';
    }

    desc.trim().length < 300
      ? setDesc(e.target.value)
      : toast.error('Description too long', { toastId: 'desc' });
  };

  return (
    <section className={`pub_modal ${!isModalOpen ? 'hide' : ''}`}>
      <div className='opts_wrapper'>
        <div className='opt_wrapper'>
          <h3>Select Category</h3>

          <div className='check_wrapper'>
            {categories.map((categ, index) => (
              <div className='check_opt' key={index}>
                <input
                  type='checkbox'
                  onChange={handleCheck}
                  id={`categ_check${index}`}
                  value={categ}
                />
                <label htmlFor={`categ_check${index}`}>{categ}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='opt_wrapper'>
          <h3>Description</h3>
          <textarea
            placeholder='Enter brief description about post'
            ref={descRef}
            value={desc}
            onChange={handleDesc}
          ></textarea>
        </div>

        <button className='cont_btn spc_btn' onClick={handleContinue}>
          Continue
        </button>
      </div>
    </section>
  );
};
