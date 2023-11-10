import { storage, db, auth } from './config';
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  UploadTask,
} from 'firebase/storage';
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
  deleteUser,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  Timestamp,
  query,
  collection,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
} from 'firebase/firestore';
import ShortUniqueId from 'short-unique-id';
import { PostInt, UpdateDataInt, UserInfoInt } from '../../types';

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

  delUser() {
    return deleteUser(auth.currentUser!);
  }

  // *Firestore methods
  setUserInfo(data: UserInfoInt) {
    const docRef = doc(db, `users/${data.uid}`);
    return setDoc(docRef, data);
  }

  updateUserInfo(data: UpdateDataInt) {
    const docRef = doc(db, `users/${auth.currentUser?.uid}`);
    return updateDoc(docRef, { ...data });
  }

  getUserInfo(userId: string) {
    const docRef = doc(db, `users/${userId}`);
    return getDoc(docRef);
  }

  delUserInfo(uid: string) {
    const docRef = doc(db, `users/${uid}`);
    return deleteDoc(docRef);
  }

  addPubPosts(data: PostInt) {
    const docRef = doc(db, `posts/${data.postId}`);
    return setDoc(docRef, data);
  }

  addUserPosts(data: PostInt) {
    const docRef = doc(db, `users/${data.uid}/posts/${data.postId}`);
    console.log('data: ', data);

    return setDoc(docRef, data);
  }

  getPosts(isMore: boolean, lastDocTime: Timestamp | null) {
    const q = isMore
      ? query(
          collection(db, 'posts'),
          orderBy('publishedAt', 'desc'),
          startAfter(lastDocTime),
          limit(10)
        )
      : query(
          collection(db, 'posts'),
          orderBy('publishedAt', 'desc'),
          limit(10)
        );
    return getDocs(q);
  }

  getUserPosts(
    isMore: boolean,
    lastDocTime: Timestamp | null,
    userId: string,
    isPubOnly: boolean
  ) {
    const q = isPubOnly
      ? isMore
        ? query(
            collection(db, `posts`),
            where('uid', '==', userId),
            orderBy('publishedAt', 'desc'),
            startAfter(lastDocTime),
            limit(3)
          )
        : query(
            collection(db, `posts`),
            where('uid', '==', userId),
            orderBy('publishedAt', 'desc'),
            limit(3)
          )
      : isMore
      ? query(
          collection(db, `users/${userId}/posts`),
          orderBy('createdAt', 'desc'),
          startAfter(lastDocTime),
          limit(3)
        )
      : query(
          collection(db, `users/${userId}/posts`),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
    return getDocs(q);
  }

  setTime() {
    const docRef = doc(db, 'currTime/currTime');
    return setDoc(docRef, { time: serverTimestamp() });
  }

  getTime() {
    const docRef = doc(db, 'currTime/currTime');
    return getDoc(docRef);
  }

  // * Storage methods
  uploadBannerPostImg(
    userId: string,
    postId: string,
    imgFile: File,
    isBanner: boolean
  ): UploadTask {
    const imgRef = isBanner
      ? ref(storage, `${userId}/posts/${postId}/banner`)
      : ref(storage, `${userId}/posts/${postId}/imgs/${uidShort.rnd()}`);
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
