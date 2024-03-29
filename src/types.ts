import { FieldValue } from 'firebase/firestore';

export interface DummyPostsInt {
  isDummy: boolean;
  postId: string;
}

export interface PostInt {
  userId: string;
  uid: string;
  isDummy: boolean;
  postId: string;
  post: string;
  bannerUrl: string;
  isPublished: boolean;
  likes: string[];
  bookmarks: string[];
  publishedAt?: FieldValue | string;
  createdAt: FieldValue | string;
  selCategs?: string[];
  desc?: string;
  title: string;
  views: string[];
}

export interface UpdatePostInt {
  post?: string;
  bannerUrl?: string;
  isPublished?: boolean;
  likes?: string[];
  bookmarks?: string[];
  commentsCount?: number;
  selCategs?: string[];
  desc?: string;
  title?: string;
  views?: string[];
}

export interface CommentInt extends CommentDataInt {
  aviUrl: string;
  replierName: string;
}

export interface CommentDataInt {
  createdAt: FieldValue | string;
  comment: string;
  likes: string[];
  commentId: string;
  uid: string;
  parentId: null | string;
  isDelete: boolean;
}

export interface UpdateCommentDataInt {
  comment?: string;
  likes?: string[];
  isDelete?: boolean;
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

export interface SearchFollowsInt extends FollowsInt {
  isDummy: boolean;
  postId: string;
  createdAt: string;
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
  fullName?: string;
  userName?: string;
  country?: CountryInt;
  state?: string;
  bio?: string;
  gender?: string;
  socials?: {
    git: string;
    X: string;
    fb: string;
    ins: string;
    be: string;
    url: string;
  };
  userColor?: string;
  dispEmail?: boolean;
  aviUrls?: {
    bigAviUrl: string;
    smallAviUrl: string;
  };
  postCount?: number;
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
  bookmarks: BookmarkInt[];
}

export interface BookmarksInt {
  aviUrl: string;
  title: string;
  uid: string;
  postId: string;
  publishedAt: FieldValue | string;
  author: string;
  categs: string[];
}

export interface BookmarkInt {
  postId: string;
  uid: string;
}

export interface DateExtractInt {
  day: string;
  month: string;
  date: string;
  year: string;
  hours: string;
  mins: string;
  secs: string;
}

export interface EditInt {
  state: boolean;
  postInfo: PostInt | null;
}
