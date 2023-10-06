import { FieldValue } from 'firebase/firestore';

export interface PostsInt {
  isDummy: boolean;
  id: string;
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

export interface UserInfoInt extends FormDataInt {
  email: string;
  userId: string;
  aviUrls: {
    bigAviUrl: string;
    smallAviUrl: string;
  };
  createdAt: FieldValue | string;
  followers: FollowsInt[];
  followings: FollowsInt[];
  userColor: string;
  postCount: number;
}
