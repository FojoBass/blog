import { FieldValue } from 'firebase/firestore';

export interface DummyPostsInt {
  isDummy: boolean;
  id: string;
}

export interface PostInt {
  userId: string;
  isDummy: boolean;
  postId: string;
  post: string;
  bannerUrl: string;
  isPublished: boolean;
  comments: CommentInt[];
  likes: string[];
  bookmarks: string[];
  commentsCount: number;
  publishedAt?: FieldValue | string;
  selCategs?: string[];
  desc?: string;
}

// export enum CategoryEnum {
//   cyb = 'cyber security',
//   web = 'web development',
//   data = 'data science',
//   gen = 'general',
// }

export interface CommentInt {
  aviUrl: string;
  name: string;
  createdAt: FieldValue | string;
  comment: string;
  likes: number;
  comments: CommentInt[];
}

export interface CountryInt {
  name: string;
  code: string;
}

export interface FollowsInt {
  userName: string;
  id: string;
  avi: string;
}

export interface PostInfoType {
  title: string;
  createdAt: string;
  bannerImgUrl: string;
  post: string;
  category: string;
  userName: string;
  userAvi: string;
}

export interface FormDataInt {
  fullName: string;
  userName: string;
  country: CountryInt;
  state: string;
  dob: string;
  bio: string;
  gender: string;
  socials: {
    git: string;
    X: string;
    fb: string;
    ins: string;
    be: string;
    url: string;
  };
}

export interface UpdateDataInt {
  fullName: string;
  userName: string;
  country: CountryInt;
  state: string;
  bio: string;
  gender: string;
  socials: {
    git: string;
    X: string;
    fb: string;
    ins: string;
    be: string;
    url: string;
  };
  userColor: string;
  dispEmail: boolean;
  aviUrls?: {
    bigAviUrl: string;
    smallAviUrl: string;
  };
}

export interface UserInfoInt extends FormDataInt {
  email: string;
  userId: string;
  uid: string;
  aviUrls: {
    bigAviUrl: string;
    smallAviUrl: string;
  };
  createdAt: FieldValue | string;
  followers: FollowsInt[];
  followings: FollowsInt[];
  userColor: string;
  postCount: number;
  dispEmail: boolean;
}
