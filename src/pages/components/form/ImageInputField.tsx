import React, { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useBlogSelector } from '../../../app/store';

const ImageInputField = () => {
  const [aviSrc, setAviSrc] = useState(''),
    [aviBigFile, setAviBigFile] = useState<File | null>(null),
    [aviSmallFile, setAviSmallFile] = useState<File | null>(null),
    blogTheme = useBlogSelector((state) => state.theme);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];

    if (imgFile && imgFile.type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imgUrl = e?.target?.result as string;
        const imgEl = document.createElement('img');
        imgEl.src = imgUrl;

        imgEl.onload = (e: Event) => {
          const target = e?.target as HTMLImageElement,
            canvasSmall = document.createElement('canvas'),
            canvasBig = document.createElement('canvas'),
            ratioSmall = 50 / target?.width,
            ratioBig = 100 / target.width,
            contextSmall = canvasSmall.getContext('2d'),
            contextBig = canvasBig.getContext('2d');

          canvasSmall.width = 50;
          canvasSmall.height = target.height * ratioSmall;

          canvasBig.width = 100;
          canvasBig.height = target.height * ratioBig;

          contextSmall?.drawImage(
            imgEl,
            0,
            0,
            canvasSmall.width,
            canvasSmall.height
          );

          contextBig?.drawImage(imgEl, 0, 0, canvasBig.width, canvasBig.height);

          const imgSmallUrl =
              contextSmall?.canvas.toDataURL(
                'image/jpeg, image/jpg, image/png',
                1
              ) ?? '',
            imgBigUrl =
              contextBig?.canvas.toDataURL(
                'image/jpeg, image/jpg, image/png',
                1
              ) ?? '';

          setAviSrc(imgSmallUrl);
          setAviSmallFile(urlToFile(imgSmallUrl, 'small'));
          setAviBigFile(urlToFile(imgBigUrl, 'big'));
        };
      };
    } else {
      toast.error('Only images are allowed!', {
        theme: blogTheme === 'light' ? 'light' : 'dark',
      });
    }
  };

  const urlToFile = (url: string, fileName: string) => {
    const urlArr = url.split(','),
      type = urlArr[0].match(/:(.*?);/)?.[1],
      urlData = atob(urlArr[1]);
    let n = urlData.length;
    const dataArr = new Uint8Array(n);

    while (n--) {
      dataArr[n] = urlData.charCodeAt(n);
    }

    return new File([dataArr], `${fileName}.jpg`, { type });
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
