import React, { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useBlogSelector } from '../../../app/store';
import { resizeImg } from '../../../helpers/imgResize';
import { useGlobalContext } from '../../../context';

const ImageInputField = () => {
  const [aviSrc, setAviSrc] = useState(''),
    blogTheme = useBlogSelector((state) => state.theme);
  const { aviBigFile, setAviBigFile, aviSmallFile, setAviSmallFile } =
    useGlobalContext();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    try {
      const smallImg = await resizeImg(imgFile, blogTheme, 50, 1);
      const bigImg = await resizeImg(imgFile, blogTheme, 100, 1);
      if (typeof smallImg !== 'string' && setAviSmallFile) {
        setAviSrc(smallImg.finalUrl);
        setAviSmallFile(smallImg.finalFile);
      }

      if (typeof bigImg !== 'string' && setAviBigFile)
        setAviBigFile(bigImg.finalFile);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form_opt'>
      <div
        className='img_wrapper'
        style={!aviSrc ? { visibility: 'hidden' } : {}}
      >
        {aviSrc ? <img src={aviSrc} alt='' /> : ''}
      </div>
      <input
        type='file'
        name='avi'
        onChange={handleFileChange}
        accept='.jpg, .jpeg, .png'
      />
    </div>
  );
};

export default ImageInputField;
