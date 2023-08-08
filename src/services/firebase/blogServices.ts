import { v4 } from 'uuid';
import { storage, db, auth } from './config';
import { ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { FormDataInt } from '../../pages/Signup';

interface userInfoInt extends FormDataInt {
  aviUrls: {
    bigAviUrl: string;
    smallAviUrl: string;
  };
  userId: string;
}

export class BlogServices {
  // *Auth methods
  emailReg(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  logOut() {
    return signOut(auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // *Firestore methods
  setUserInfo(data: userInfoInt) {
    const docRef = doc(db, `users/${data.userId}`);
    return setDoc(docRef, data);
  }

  // * Storage methods
  uploadBannerPostImg(
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

  uplaodAviImg(userId: string, isBig: boolean, imgFile: File) {
    const imgRef = ref(
      storage,
      `${userId}/avi/${v4()}_${isBig ? 'big' : 'small'}`
    );
    return uploadBytesResumable(imgRef, imgFile);
  }
}
