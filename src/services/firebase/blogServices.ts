import { storage, db, auth } from './config';
import { ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signOut,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  User,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import ShortUniqueId from 'short-unique-id';
import { UpdateDataInt, UserInfoInt } from '../../types';

const uidLong = new ShortUniqueId({ length: 10 });
const uidShort = new ShortUniqueId({ length: 7 });

const gitProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

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

  signInGit(): Promise<UserCredential> {
    return signInWithPopup(auth, gitProvider);
  }

  signInGoo(): Promise<UserCredential> {
    return signInWithPopup(auth, googleProvider);
  }

  verification(user: User) {
    return sendEmailVerification(user, {
      url: `https://devie.netlify.app/`,
    });
  }

  forgotPword(email: string) {
    return sendPasswordResetEmail(auth, email, {
      url: `https://devie.netlify.app/`,
    });
  }

  // *Firestore methods
  setUserInfo(data: UserInfoInt) {
    const docRef = doc(db, `users/${data.userId}`);
    return setDoc(docRef, data);
  }

  updateUserInfo(data: UpdateDataInt) {
    const docRef = doc(db, `users/${data.userId}`);
    return updateDoc(docRef, { ...data });
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
      : ref(storage, `${userId}/posts/${postId}_post_${uidShort.rnd()}`);
    return uploadBytesResumable(imgRef, imgFile);
  }

  uplaodAviImg(userId: string, isBig: boolean, imgFile: File) {
    const imgRef = ref(
      storage,
      `${userId}/avi/${uidShort.rnd()}_${isBig ? 'big' : 'small'}`
    );
    return uploadBytesResumable(imgRef, imgFile);
  }
}
