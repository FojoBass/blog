export interface PostsInt {
  isDummy: boolean;
  id: string;
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
