import { v4 } from 'uuid';
import { storage, db, auth } from './config';
import { ref, uploadBytesResumable, UploadTask } from 'firebase/storage';

export class BlogServices {
  // * Storage methods
  uploadImage(
    userId: string,
    postId: string,
    imgFile: File,
    isBanner: boolean
  ): UploadTask {
    const imgRef = isBanner
      ? ref(storage, `${userId}/banners/${postId}_banner`)
      : ref(storage, `${userId}/posts/${postId}_post_${v4()}`);
    return uploadBytesResumable(imgRef, imgFile);
  }
}
