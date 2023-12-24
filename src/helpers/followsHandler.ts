import { toast } from 'react-toastify';
import { BlogServices } from '../services/firebase/blogServices';
import { FollowsInt, UserInfoInt } from '../types';

interface FollowsHandlerInt {
  (
    userInfo: UserInfoInt,
    followers: FollowsInt[],
    isFollow: boolean,
    targetUserInfo: { posterName: string; uid: string; avi: string }
  ): Promise<void>;
}

const blogServices = new BlogServices();
const checkFollows = (follows: FollowsInt[], uid: string) =>
  follows.find((flw) => flw.id === uid);

export const followsHandler: FollowsHandlerInt = (
  userInfo,
  followers,
  isFollow,
  targetUserInfo
) => {
  return new Promise(async (resolve, reject) => {
    const { posterName: userName, uid: id, avi } = targetUserInfo;
    let userFollowings = [...(userInfo.followings ?? [])];
    if (isFollow) {
      if (!checkFollows(followers, userInfo.uid)) reject('Not a follower');
      followers = followers.filter((flw) => flw.id !== userInfo.uid);
      userFollowings = userFollowings.filter((flw) => flw.id !== id);
    } else {
      if (checkFollows(followers, userInfo.uid ?? ''))
        reject('Already a follower');
      followers.push({
        userName: userInfo.userName ?? '',
        id: userInfo.uid ?? '',
        avi: userInfo.aviUrls.smallAviUrl ?? '',
      });
      userFollowings.push({
        userName,
        id,
        avi,
      });
    }
    try {
      await blogServices.updateUserFollows({ followers }, id);
      await blogServices.updateUserFollows(
        { followings: userFollowings },
        userInfo.uid ?? ''
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
