import { toast } from 'react-toastify';

interface ResizeFuncReturnType {
  finalUrl: string;
  finalFile: File | null;
}

interface ResizeFuncType {
  (
    imgFile: File | undefined,
    blogTheme: string,
    width: number,
    quality: number
  ): Promise<ResizeFuncReturnType> | '';
}

export const resizeImg: ResizeFuncType = (
  imgFile,
  blogTheme,
  width,
  quality
) => {
  if (imgFile && imgFile.type.includes('image')) {
    let finalUrl = '';
    let finalFile: null | File = null;
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);

    const resizePromise = new Promise<ResizeFuncReturnType>(
      (resolve, reject) => {
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const imgUrl = e?.target?.result as string;
          const imgEl = document.createElement('img');
          imgEl.src = imgUrl;

          imgEl.onload = (e: Event) => {
            const target = e?.target as HTMLImageElement,
              canvas = document.createElement('canvas'),
              context = canvas.getContext('2d');
            const ratio = width / target?.width;

            canvas.width = width;
            canvas.height = target.height * ratio;

            context?.drawImage(imgEl, 0, 0, canvas.width, canvas.height);

            finalUrl = context?.canvas.toDataURL('image/jpeg', quality) ?? '';

            finalFile = urlToFile(finalUrl, 'fileName');

            if (finalFile && finalUrl) resolve({ finalUrl, finalFile });
            else reject('Something wrong with image conversion');
          };
        };
      }
    );
    return resizePromise;
  } else {
    toast.error('Only images are allowed!');
    return '';
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
