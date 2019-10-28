import { createFollow, deleteFollow } from '../util/follow_api_util';

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

const receiveFollow = follow => ({
  type: RECEIVE_FOLLOW,
  follow
});

const removeFollow = follow => ({
  type: REMOVE_FOLLOW,
  follow
});

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
