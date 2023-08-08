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

interface EditorFuncInt {
  (
    symbol: string,
    startPos: number,
    endPos: number,
    block?: boolean,
    type?: string
  ): void;
}

interface PostInt {
  postMain: string;
  bannerUrl: string;
  postTitle: string;
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
  const [post, setPost] = useState<PostInt>({ postMain, bannerUrl, postTitle });

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postMainRef = useRef<HTMLTextAreaElement>(null);

  const dummyUserId = useRef(v4());
  const postId = useRef(v4());

  const dispatch = useBlogDispatch();
  const { parsedPost } = useBlogSelector((state) => state.blog);
  const { isUserLoggedIn } = useBlogSelector((state) => state.user);
  const { handleParsePost } = blogSlice.actions;

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
        // todo Work on sending file to Fire storage
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
          // todo Work on sending file to Fire storage
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
      dummyUserId.current,
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
    if (route === 'preview') dispatch(handleParsePost(post.postMain));
    if (route === 'edit') dispatch(handleParsePost(''));
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
            <div className='left_side'>
              <button className='publish_btn spc_btn'>Publish</button>
              <button className='save_btn'>Save</button>
            </div>

            <button className='revert_btn'>Revert</button>
          </footer>
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
