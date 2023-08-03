import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
} from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';
import { BsFileImage } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import banTest from '../assets/Me cropped.jpg';
import { resizeImg } from '../helpers/imgResize';
import { useBlogSelector } from '../app/store';
import { BlogServices } from '../services/firebase/blogServices';
import { v4 } from 'uuid';
import { getDownloadURL } from 'firebase/storage';

const NewPost = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState('');
  const [bannerImgFile, setBannerImgFile] = useState<null | File>(null);
  const [isUploadingBannerImg, setIsUploadingBannerImg] = useState(false);
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);
  const blogTheme = useBlogSelector((state) => state.theme);
  const [isResizing, setIsResizing] = useState(false);
  const [isBannerReady, setIsBannerReady] = useState(false);
  const [postTitle, setPostTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const dummyUserId = useRef(v4());
  const postId = useRef(v4());

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (imgFile) {
      setIsResizing(true);
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
        setIsResizing(false);
      }
    }
  };

  const handleRemove = (e: MouseEvent) => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setBannerImgFile(null);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostTitle(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    if (isBannerReady && bannerImgFile) {
      setIsUploadingBannerImg(true);
      const uploadTask = new BlogServices().uploadImage(
        dummyUserId.current,
        postId.current,
        bannerImgFile,
        true
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
            setBannerUrl(downloadURL);
            setIsUploadingBannerImg(false);
            setIsBannerReady(false);
          });
        }
      );
    }
  }, [isBannerReady, bannerImgFile]);

  useEffect(() => {
    setRoute('edit');
  }, []);

  return (
    <section id='editor_sect'>
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
          <header className='editor_head'>
            <div className='editor_top'>
              <input
                type='file'
                name=''
                id='select_banner'
                hidden
                onChange={handleFileChange}
                ref={inputRef}
              />
              {bannerImgFile ? (
                isUploadingBannerImg ? (
                  <p className='upload_progress'>
                    <span style={{ width: `${bannerUploadProgress}%` }}></span>
                    Uploading...
                  </p>
                ) : (
                  <>
                    <div className='img_wrapper'>
                      <img src={bannerUrl} alt='Banner img' />
                    </div>

                    <div className='img_btns'>
                      <label htmlFor='select_banner' className='change_img_btn'>
                        Change
                      </label>
                      <button className='remove_img_btn' onClick={handleRemove}>
                        Remove
                      </button>
                    </div>
                  </>
                )
              ) : (
                <label
                  className='add_banner_btn'
                  htmlFor='select_banner'
                  style={isResizing ? { pointerEvents: 'none' } : {}}
                >
                  Add a cover image
                </label>
              )}
            </div>

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
              <button className='action_btn bold_btn'>B</button>
            </div>
            <div className='btn_wrapper'>
              <button className='action_btn italize_btn'>
                <em>I</em>
              </button>
            </div>
            <div className='btn_wrapper'>
              <button className='action_btn link_btn'>
                <AiOutlineLink />{' '}
              </button>
            </div>
            <div className='btn_wrapper'>
              <button className='action_btn strike_btn'>
                <s>S</s>
              </button>
            </div>
            <div className='btn_wrapper'>
              <button className='action_btn img_btn'>
                <BsFileImage />
              </button>
            </div>
            <div className='btn_wrapper'>
              <button className='action_btn underline_btn '>U</button>
            </div>
            <div className='btn_wrapper'>
              <button className='action_btn big_H'>
                H<sub>b</sub>
              </button>
            </div>
            <div className='btn_wrapper'>
              <button className='action_btn small_H'>
                H<sub>s</sub>
              </button>
            </div>
          </div>

          <textarea
            className='post_editor'
            placeholder='Write your post content here...'
          ></textarea>
        </div>
      </div>

      <footer className='editor_footer'>
        <div className='left_side'>
          <button className='publish_btn spc_btn'>Publish</button>
          <button className='save_btn'>Save</button>
        </div>

        <button className='revert_btn'>Revert</button>
      </footer>
    </section>
  );
};

export default NewPost;
