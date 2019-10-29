import { createFollow, deleteFollow, getUserFollows } from '../util/follow_api_util';

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";
export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";

const receiveFollows = follows => ({
  type: RECEIVE_FOLLOWS,
  follows
});

const receiveFollow = follow => ({
  type: RECEIVE_FOLLOW,
  follow
});

const removeFollow = follow => ({
  type: REMOVE_FOLLOW,
  follow
});

export const retrieveUserFollows = userId => dispatch => {
  return getUserFollows(userId)
    .then(res => dispatch(receiveFollows(res.data)))
    .catch(err => console.log(err))
}

export const makeFollow = follow => dispatch => {
  return createFollow(follow)
    .then(follow => {
      dispatch(receiveFollow(follow.data))
      return follow;
    })
    .catch(err => console.log(err))
};

export const unFollow = id => dispatch => {
  return deleteFollow(id)
    .then(res => dispatch(removeFollow(res.data)))
    .catch(err => console.log(err))
};
